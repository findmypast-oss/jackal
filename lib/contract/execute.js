'use strict'

const Joi = require('joi')
const joiOptions = require('./joi-options')
const compileUrl = require('../request/compile-url')
const formatBody = require('../request/format-body')
const executeAfterHooks = require('./hook/execute-after')
const compileHeaders = require('../request/compile-headers')
const createExecutionError = require('./create-execution-error')

module.exports = function (cb, err, variables) {
  if (err) { return cb(err) }

  const executeAfterHooksCallback = executeAfterHooks.bind(this, variables, cb)

  const schema = Joi.object().keys(this._response)

  this._request.url = compileUrl(this._request.url, variables)
  this._request.body = formatBody(this._request.body)
  this._request.headers = compileHeaders(this._request.headers, variables)

  this._client(this._request, (err, res, body) => {
    if (err) {
      const requestError = new Error(`Request failed: ${err.message}`)
      return executeAfterHooksCallback(requestError)
    }

    const result = Joi.validate(res, schema, joiOptions)
    if (result.error) {
      const detail = result.error.details[0]
      const path = detail.path
      const executionError = createExecutionError(detail, path, res, body)

      return executeAfterHooksCallback(executionError)
    }

    executeAfterHooksCallback()
  })
}
