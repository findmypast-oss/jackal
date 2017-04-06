'use strict'

const request = require('request')
const parser = require('./response-contract-results')
const url = require('./jackal-url')

module.exports = (providerName, options, done) => {
  const jacky = url(options, `/api/contracts/${providerName}`)
  request(jacky, parser(done))
}
