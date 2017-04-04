'use strict'

const execute = require('../../../lib/contract/executor')
const hashData = require('../../../lib/hash-data')
const mapResult = require('../../../lib/contract/map-result')
const parseContract = require('../../../lib/contract/parse-contract')
const flattenDeep = require('lodash/flattenDeep')
const map = require('lodash.map')

const createExecuteConsumer = (db) => (req, res, next) => {
  const json = JSON.stringify(req.body)
  const hash = hashData(json)
  const contracts = db.retrieve('contracts', hash).contracts
  const parsedContracts = parseContracts(contracts)

  execute(parsedContracts, (err, results) => {
    res.status(201).send(results.map(mapResult))
    next()
  })
}

module.exports = createExecuteConsumer

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
