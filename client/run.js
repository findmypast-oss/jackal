'use strict'

const request = require('request')
const parser = require('./response-contract-results')

function run(options, done) {
  request(options.jackalUrl, parser(done))
}

module.exports = run
