'use strict'

const parseResponse = require('./parse-response')

const parseContract = (contract) => {
  const parsed = parseResponse(contract.response)

  return {
    name: contract.name,
    consumer: contract.consumer,
    before: contract.before,
    request: contract.request,
    response: parsed.valid ? parsed.response : parsed.error
  }
}

module.exports = parseContract
