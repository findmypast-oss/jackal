'use strict'

const _ = require('lodash')
const jp = require('jsonpath')
const request = require('request')
const buildUrl = require('../../build-url')
const formatBody = require('../../request/format-body')
const parseResponseBody = require('./parse-response-body')

const extractValue = (object) => (path) => jp.value(object, path)

module.exports = (state, hook, done) => {
  const _request = {
    method: hook.request.method,
    url: buildUrl(hook.request.baseUrl, hook.request.path, hook.request.query),
    timeout: hook.request.timeout,
    headers: hook.request.headers
  }

  _request.body = formatBody(hook.request.body)
  console.error(typeof _request.body)

  request(_request, (err, res, body) => {
    if (err) { return done(err) }

    const responseBody = parseResponseBody(res, body)
    if (typeof responseBody === 'object' && hook.variables) {
      const result = _.mapValues(hook.variables, extractValue(responseBody))
      state = _.merge(state, result)
    }

    return done(null, state)
  })
}
