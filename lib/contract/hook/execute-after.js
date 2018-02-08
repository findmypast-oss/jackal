'use strict'

const async = require('async')
const reduceHook = require('./reduce')

module.exports = function (variables, cb, err) {
  if (err) { return cb(err) }

  variables.hookArrayType = 'after'
  async.reduce(this.after, variables, reduceHook, (err) => cb(err))
}
