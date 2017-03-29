'use strict'

const request = require('request')

const run = function (jackalUrl, cb) {
  request(jackalUrl, cb)
}

module.exports = run
