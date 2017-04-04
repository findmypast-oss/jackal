'use strict'

const request = require('request')
const parser = require('./response-contract-results')

module.exports = (options, done) => {
  request(options.jackalUrl, parser(done))
}
