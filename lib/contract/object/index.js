'use strict'

const Joi = require('joi')
const util = require('util')
const debug = require('debug')('consumer-contracts')
const _ = require('lodash')
const async = require('async')
const packageInfo = require('../../../package')

const requiredOptions = [
  'name',
  'consumer',
  'request',
  'response'
]

const joiOptions = {
  allowUnknown: true,
  presence: 'required'
}

const validateOptions = options => {
  options = options || {}
  requiredOptions.forEach(function (key) {
    if (!options.hasOwnProperty(key)) {
      throw new Error('Invalid contract: Missing required property [' + key + ']')
    }
  })
}

const Contract = function (options) {
  validateOptions(options)
  this.name = options.name
  this.consumer = options.consumer
  this.request = options.request
  this.response = options.response
  this.client = (options.client || require('request')).defaults({
    json: true,
    headers: {
      'user-agent': 'jackal/' + packageInfo.version
    }
  })
  this.before = options.before
  this.after = options.after
  if (options.joiOptions) {
    this.joiOptions = joiOptions = _.merge(joiOptions, options.joiOptions)
  }
}

Contract.prototype.validate = function (cb) {
  const schema = Joi.object().keys(this.response)
  const client = this.client
  const request = this.request
  const tasks = []

  if (this.before) {
    tasks.push(this.before)
  }

  tasks.push(function (done) {
    client(request, function (err, res) {
      if (err) return done(new Error(util.format('Request failed: %s', err.message)))

      debug(util.format('%s %s %s', res.request.method, res.request.href, res.statusCode))

      const result = Joi.validate(res, schema, joiOptions)
      let path
      let detail

      if (result.error) {
        detail = result.error.details[0]
        path = detail.path
        err = new Error(util.format('Contract failed: %s', detail.message))
        err.detail = util.format('at res.%s got [%s]', path, _.get(res, path))
      }

      done(err)
    })
  })

  if (this.after) {
    tasks.push(this.after)
  }

  async.series(tasks, cb)
}

module.exports = Contract
