'use strict'

const async = require('async')
const mapHook = require('./map')

module.exports = function (cb, err) {
  if (err) { return cb(err) }

  let afterHooks = []
  if (this.after) { afterHooks = this.after.map(mapHook) }

  async.series(afterHooks, cb)
}
