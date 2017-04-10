'use strict'

const request = require('request')
const parser = require('./response-contract-results')
const url = require('./jackal-url')

module.exports = (jackalUrl, providerName, options, done) => {
  const jacky = url(jackalUrl, `/api/contracts/${providerName}`)
  request(jacky, parser(done))
}
