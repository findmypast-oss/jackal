'use strict'

const map = require('lodash.map')
const flattenDeep = require('lodash/flattenDeep')
const mapResult = require('../../../lib/map-result')
const execute = require('../../../lib/contract/executor')
const mapContractObjectToContractArray = require('../../../lib/map-contract-object-to-contract-array')

const createExecuteProvider = (db) => (req, res, next) => {
  const provider = req.params.provider
  const testUrl = req.query.testUrl

  const contracts = db.retrieveCollection(provider).map(dbo => dbo.contract)
  const parsedContracts = parseContracts(contracts, testUrl)

  execute(parsedContracts, (err, results) => {
    res.status(200).send(results.map(mapResult))

    next()
  })
}

module.exports = createExecuteProvider

const parseContracts = (contracts, testUrl) => {
  const nestedContracts = map(contracts, (contract) => {
    return mapContractObjectToContractArray(contract, testUrl)
  })

  return flattenDeep(nestedContracts)
}
