'use strict'

const _ = require('lodash')
const parseContract = require('./contract/parse')

const mapContractObjectToContractArray = (contracts, testUrl) => {
  const nestedContracts = _.map(contracts, (consumer, consumerName) => {
    return _.map(consumer, (provider, providerName) => {
      return _.map(provider, (api, apiName) => {
        return _.map(api, (scenario, scenarioName) => {
          return parseContract(scenario, consumerName, providerName, apiName, scenarioName, testUrl)
        })
      })
    })
  })

  return _.flattenDeep(nestedContracts)
}

module.exports = mapContractObjectToContractArray
