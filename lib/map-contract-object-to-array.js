'use strict'

const map = require('lodash.map')
const flattenDeep = require('lodash/flattenDeep')

const mapContractObjectToArray = (contract, mapFunction) => {
  const nestedObjects = map(contract, (consumer) => {
    return map(consumer, (provider) => {
      return map(provider, (api) => {
        return map(api, (scenario) => {
          return mapFunction(scenario)
        })
      })
    })
  })

  return flattenDeep(nestedObjects)
}

module.exports = mapContractObjectToArray
