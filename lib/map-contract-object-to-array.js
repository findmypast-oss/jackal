'use strict'

const map = require('lodash.map')
const flattenDeep = require('lodash/flattenDeep')

const mapContractObjectToArray = (contract, mapFunction) => {
  const nestedObjects = map(contract, (consumer, consumerName) => {
    return map(consumer, (provider, providerName) => {
      return map(provider, (api, apiName) => {
        return map(api, (scenario, scenarioName) => {
          return mapFunction(scenario, consumerName, providerName, apiName, scenarioName)
        })
      })
    })
  })

  return flattenDeep(nestedObjects)
}

module.exports = mapContractObjectToArray
