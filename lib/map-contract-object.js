'use strict'

const map = require('lodash.map')
const flattenDeep = require('lodash/flattenDeep')

const mapContractObjectToArray = (contracts, mapFunction) => {
  const nestedContracts = map(contracts, (consumer) => {
    return map(consumer, (provider) => {
      return map(provider, (api) => {
        return map(api, (scenario) => {
          return mapFunction(scenario)
        })
      })
    })
  })

  return flattenDeep(nestedContracts)
}

module.exports = mapContractObjectToArray
