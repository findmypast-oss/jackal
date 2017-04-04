'use strict'

const map = require('lodash.map')
const flattenDeep = require('lodash/flattenDeep')
const parseContract = require('./parse-contract')

const mapContractObjectToContractArray = (contracts) => {
  const nestedContracts = map(contracts, (consumer, consumerName) => {
    return map(consumer, (provider, providerName) => {
      return map(provider, (api, apiName) => {
        return map(api, (scenario, scenarioName) => {
          const name = `${providerName}/${apiName}/${scenarioName}`
          const meta = { name: name, consumer: consumerName }

          return Object.assign({}, parseContract(scenario), meta)
        })
      })
    })
  })

  return flattenDeep(nestedContracts)
}

module.exports = mapContractObjectToContractArray
