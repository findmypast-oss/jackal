'use strict'

const request = require('request')
const parser = require('./response-contract-results')
const url = require('./jackal-url')

module.exports = (jackalUrl, providerName, options, done) => {
  let jacky
  if (options.testUrl) {
    const query = `testUrl=${options.provider.testUrl}`
    jacky = url(options, `/api/contracts/${providerName}?${query}`)
  } else {
    jacky = url(options, `/api/contracts/${providerName}`)
  }

  request(jacky, parser(done))
}
