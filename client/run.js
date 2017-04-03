'use strict'

const request = require('request')
const parser = require('./contract-results-parser')

function run(options, done) {
  request(options.jackalUrl, parser(done))
}

module.exports = run
