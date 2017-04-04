'use strict'

const map = require('lodash.map')
const flattenDeep = require('lodash/flattenDeep')
const parseContract = require('./parse-contract')

const mapContractObjectToContractArray = (contracts) => {
  const nestedContracts = map(contracts, (consumer, consumerName) => {
    return map(consumer, (provider, providerName) => {
      return map(provider, (api, apiName) => {
        return map(api, (scenario, scenarioName) => {
          return parseContract(scenario, consumerName, providerName, apiName, scenarioName)
        })
      })
    })
  })

  return flattenDeep(nestedContracts)
}

module.exports = mapContractObjectToContractArray
