'use strict'

const _ = require('lodash')
const jp = require('jsonpath')
const request = require('request')
const buildUrl = require('../build-url')

const requestBodyShouldBeSerialized = (body) => {
  return Array.isArray(body) || typeof body === 'object'
}

const extractValue = (object) => (path) => jp.value(object, path)

const buildResult = (queries, object) => {
  return queries
    ? _.mapValues(queries, extractValue(object))
    : {}
}

module.exports = (state, hook, done) => {
  const _request = {
    method: hook.request.method,
    url: buildUrl(hook.request.baseUrl, hook.request.path, hook.request.query),
    timeout: hook.request.timeout,
    headers: hook.request.headers,
    body: hook.request.body
  }

  if (requestBodyShouldBeSerialized(hook.request.body)) { _request.json = true }

  request(_request, (err, res, body) => {
    if (err) { return done(err) }

    const result = {
      body: _.merge(state.body, buildResult(hook.response.body, body)),
      headers: _.merge(state.headers, buildResult(hook.response.headers, res.headers))
    }

    return done(null, _.merge(state, result))
  })
}
