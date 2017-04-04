'use strict'

const hashData = require('../../../lib/hash-data')
const mapResult = require('../../../lib/map-result')
const execute = require('../../../lib/contract/executor')
const mapContractObjectToContractArray = require('../../../lib/map-contract-object-to-contract-array')

const createExecuteConsumer = (db) => (req, res, next) => {
  const json = JSON.stringify(req.body)
  const hash = hashData(json)
  const contracts = db.retrieve('contracts', hash).contracts
  const parsedContracts = mapContractObjectToContractArray(contracts)

  execute(parsedContracts, (err, results) => {
    res.status(201).send(results.map(mapResult))
    next()
  })
}

module.exports = createExecuteConsumer
