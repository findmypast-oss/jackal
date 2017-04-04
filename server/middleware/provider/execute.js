'use strict'

const execute = require('../../../lib/contract/executor')
const mapResult = require('../../../lib/contract/map-result')
const parseContract = require('../../../lib/contract/parse-contract')
const flattenDeep = require('lodash/flattenDeep')
const map = require('lodash.map')

const createExecuteProvider = (db) => (req, res, next) => {
  const provider = req.params.provider
  const contracts = db.retrieveCollection(provider).map(dbo => dbo.contract)
  const parsedContracts = parseContracts(contracts)

  execute(parsedContracts, (err, results) => {
    res.status(200).send(results.map(mapResult))

    next()
  })
}

module.exports = createExecuteProvider

const parseContracts = (contracts) => {
  const consumer = Object.values(contracts)[0]
  const nestedContracts = map(consumer, (provider, providerName) => {
    return map(provider, (api, apiName) => {
      return map(api, (scenario, scenarioName) => {
        const name      = `${providerName}/${apiName}/${scenarioName}`
        return Object.assign({}, parseContract(scenario), {name: name, consumer: consumer})
      })
    })
  })

  return flattenDeep(nestedContracts)
}
