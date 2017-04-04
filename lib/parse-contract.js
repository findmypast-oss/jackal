'use strict'

const parseResponse = require('./parse-response')

const parseContract = (contract, consumer, provider, api, scenario) => {
  const parsed = parseResponse(contract.response)

  return {
    name: `${provider}/${api}/${scenario}`,
    consumer: consumer,
    before: contract.before,
    after: contract.after,
    request: contract.request,
    response: parsed.valid ? parsed.response : parsed.error
  }
}

module.exports = parseContract
