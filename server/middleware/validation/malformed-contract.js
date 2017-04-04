'use strict'

const parseContract = require('../../../lib/parse-contract')
const isMalformed = require('../../../lib/is-malformed')
const flattenDeep = require('lodash/flattenDeep')
const map = require('lodash.map')

const validateMalformedContract = (req, res, next) => {
  const contracts = req.body

  const parsedContracts = parseContracts(contracts)
  const malformedContract = parsedContracts.find(findMalformed)

  if (malformedContract) {
    res.status(400).send(malformedContract.response.body)
  } else {
    next()
  }
}

module.exports = validateMalformedContract

const findMalformed = (contract) => isMalformed(contract.response.body)

const parseContracts = (contracts) => {
  const nestedContracts = map(contracts, (consumer, consumerName) => {
    return map(consumer, (provider, providerName) => {
      return map(provider, (api, apiName) => {
        return map(api, (scenario, scenarioName) => {
          return parseContract(scenario)
        })
      })
    })
  })

  return flattenDeep(nestedContracts)
}
