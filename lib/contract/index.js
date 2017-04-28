'use strict'

const Joi = require('joi')
const _ = require('lodash')
const async = require('async')
const request = require('request')
const pkg = require('../../package')
const mapHook = require('./map-hook')
const reduceHook = require('./reduce-hook')
const validateOptions = require('./validate-options')
const compileBody = require('../request/compile-body')
const createExecutionError = require('./create-execution-error')

const joiOptions = {
  allowUnknown: true,
  presence: 'required'
}

var Contract = function (options) {
  validateOptions(options)
  this.name = options.name
  this.consumer = options.consumer
  this.before = options.before
  this.after = options.after

  this._request = options.request
  this._response = options.response
  this._client = request.defaults({
    headers: { 'user-agent': 'jackal/' + pkg.version }
  })

  if (options.joiOptions) {
    this.joiOptions = _.merge(joiOptions, options.joiOptions)
  }
}

Contract.prototype.validate = function (cb) {
  const schema = Joi.object().keys(this._response)

  let afterHooks = []

  if (this.after) { afterHooks = this.after.map(mapHook) }

  if (requestBodyShouldBeSerialized(this._request.body)) {
    const json = JSON.stringify(this._request.body)
    this._request.body = compileBody(json)
  }

  const afterHooksCb = (err) => err ? cb(err) : async.series(afterHooks, cb)

  const initialState = { body: {}, headers: {} }
  async.reduce(this.before, initialState, reduceHook, (err, state) => {
    if (err) { return cb(err) }

    const compileUrl = _.template(this._request.url)
    this._request.url = compileUrl(state.body)

    this._client(this._request, (err, res, body) => {
      if (err) { return afterHooksCb(new Error(`Request failed: ${err.message}`)) }

      const result = Joi.validate(res, schema, joiOptions)
      if (result.error) {
        const detail = result.error.details[0]
        const path = detail.path
        return afterHooksCb(createExecutionError(detail, path, res, body))
      }

      afterHooksCb()
    })
  })
}

module.exports = Contract

function requestBodyShouldBeSerialized (body) {
  return body && (Array.isArray(body) || typeof body === 'object')
}
