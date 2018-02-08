'use strict'

const _ = require('lodash')

const mapContractObjectToArray = (contract, mapFunction) => {
  const nestedObjects = _.map(contract, (consumer, consumerName) => {
    return _.map(consumer, (provider, providerName) => {
      return _.map(provider, (api, apiName) => {
        return _.map(api, (scenario, scenarioName) => {
          return mapFunction(scenario, consumerName, providerName, apiName, scenarioName)
        })
      })
    })
  })

  return _.flattenDeep(nestedObjects)
}

module.exports = mapContractObjectToArray
