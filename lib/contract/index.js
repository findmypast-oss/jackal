'use strict'

const _ = require('lodash')
const async = require('async')
const request = require('request')
const pkg = require('../../package')
const joiOptions = require('./joi-options')
const reduceHook = require('./hook/reduce')
const executeContract = require('./execute')
const validateOptions = require('./validate-options')

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
  const variables = { hookArrayType: 'before' }
  async.reduce(this.before, variables, reduceHook, executeContract.bind(this, cb))
}

module.exports = Contract
