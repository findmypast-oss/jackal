'use strict'

const parseResponse = require('./parse-response')

const parseContract = (contract) => {
  const parsed = parseResponse(contract.response)

  return {
    before: contract.before,
    after: contract.after,
    request: contract.request,
    response: parsed.valid ? parsed.response : parsed.error
  }
}

module.exports = parseContract
