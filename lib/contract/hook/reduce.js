'use strict'

const _ = require('lodash')
const jp = require('jsonpath')
const request = require('request')
const buildUrl = require('../../build-url')
const compileUrl = require('../../request/compile-url')
const formatBody = require('../../request/format-body')
const buildHookError = require('./build-error')
const compileHeaders = require('../../request/compile-headers')
const parseResponseBody = require('./parse-response-body')

const extractValue = (object) => (path) => jp.value(object, path)

module.exports = (variables, hook, done) => {
  const url = buildUrl(hook.request.baseUrl, hook.request.path, hook.request.query)

  const _request = {
    method: hook.request.method,
    url: compileUrl(url, variables),
    timeout: hook.request.timeout,
    headers: compileHeaders(hook.request.headers, variables)
  }

  _request.body = formatBody(hook.request.body, variables)

  request(_request, (err, res, body) => {
    if (err) { return done(err) }

    if (res.statusCode !== hook.response.statusCode) {
      const hookErr = buildHookError(hook.name, variables.hookArrayType, hook.response.statusCode, res)
      return done(hookErr)
    }

    const responseBody = body ? parseResponseBody(res, body) : body
    res.body = responseBody

    const result = _.mapValues(hook.variables, extractValue(res))
    variables = _.merge(variables, result)

    return done(null, variables)
  })
}
