'use strict'

const parseContract = require('../../../lib/parse-contract')
const isUnsupported = require('../../../lib/is-unsupported')
const flattenDeep = require('lodash/flattenDeep')
const map = require('lodash.map')

const validateUnsupportedContract = (req, res, next) => {
  const contracts = req.body

  const parsedContracts = parseContracts(contracts)
  const unsupportedContract = parsedContracts.find(findUnsupported)

  if (unsupportedContract) {
    res.status(400).send(unsupportedContract.response.body)
  } else {
    next()
  }
}

module.exports = validateUnsupportedContract

const findUnsupported = (contract) => isUnsupported(contract.response.body)

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
