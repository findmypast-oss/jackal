'use strict'

const request = require('request')
const parser = require('../response-parser')

const run = function (jackalUrl, quiet, done) {
  request(jackalUrl, parser(200, quiet, done))
}

module.exports = run
