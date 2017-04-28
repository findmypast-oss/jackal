'use strict'

const _ = require('lodash')
const jp = require('jsonpath')
const request = require('request')
const buildUrl = require('../build-url')
const compileBody = require('../request/compile-body')

const parseResponseBody = (res, body) => {
  const contentType = res.headers['Content-Type'] || res.headers['content-type']

  return contentType.startsWith('application/json')
    ? JSON.parse(body)
    : body
}

const requestBodyShouldBeSerialized = (body) => {
  return body && Array.isArray(body) || typeof body === 'object'
}

const extractValue = (object) => (path) => jp.value(object, path)

const buildResult = (queries, object) => {
  return queries && object && typeof object === 'object'
    ? _.mapValues(queries, extractValue(object))
    : {}
}

module.exports = (state, hook, done) => {
  const _request = {
    method: hook.request.method,
    url: buildUrl(hook.request.baseUrl, hook.request.path, hook.request.query),
    timeout: hook.request.timeout,
    headers: hook.request.headers
  }

  if (requestBodyShouldBeSerialized(hook.request.body)) {
    const json = JSON.stringify(hook.request.body)
    _request.body = compileBody(json)
  }

  request(_request, (err, res, body) => {
    if (err) { return done(err) }

    const responseBody = parseResponseBody(res, body)

    if (typeof responseBody === 'object') {
      const result = {
        body: _.merge(state.body, buildResult(hook.response.body, responseBody)),
        headers: _.merge(state.headers, buildResult(hook.response.headers, res.headers))
      }

      state = _.merge(state, result)
    }

    return done(null, state)
  })
}
