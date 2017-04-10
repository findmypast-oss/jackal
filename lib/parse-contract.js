'use strict'

const mapRequest = require('./map-request')
const parseResponse = require('./parse-response')

const parseContract = (contract, consumer, provider, api, scenario, testUrl) => {
  const parsed = parseResponse(contract.response)

  return {
    name: `${provider}/${api}/${scenario}`,
    consumer: consumer,
    before: contract.before,
    after: contract.after,
    request: mapRequest(contract.request, testUrl),
    response: parsed.valid ? parsed.response : parsed.error
  }
}

module.exports = parseContract
