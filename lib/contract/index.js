'use strict'

const Joi = require('joi')
const _ = require('lodash')
const async = require('async')
const request = require('request')
const pkg = require('../../package')
const mapHook = require('./map-hook')
const validateOptions = require('./validate-options')
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

  let beforeHooks = []
  let afterHooks = []

  if (this.before) { beforeHooks = this.before.map(mapHook) }
  if (this.after) { afterHooks = this.after.map(mapHook) }

  this._request.json = requestBodyShouldBeSerialized(this._request)

  const execute = (done) => {
    this._client(this._request, (err, res, body) => {
      if (err) { return done(new Error(`Request failed: ${err.message}`)) }

      const result = Joi.validate(res, schema, joiOptions)
      if (result.error) {
        const detail = result.error.details[0]
        const path = detail.path
        return done(createExecutionError(detail, path, res, body))
      }

      done()
    })
  }

  const afterHooksCb = (err) => err ? cb(err) : async.series(afterHooks, cb)
  const beforeHooksCb = (err) => err ? cb(err) : execute(afterHooksCb)

  async.series(beforeHooks, beforeHooksCb)
}

module.exports = Contract

function requestBodyShouldBeSerialized (_request) {
  return Array.isArray(_request.body) || typeof _request.body === 'object'
}
