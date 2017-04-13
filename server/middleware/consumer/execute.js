'use strict'

const forEach = require('lodash/forEach')
const hashData = require('../../../lib/hash-data')
const mapResult = require('../../../lib/map-result')
const execute = require('../../../lib/contract/executor')
const mapContractObjectToContractArray = require('../../../lib/map-contract-object-to-contract-array')

const createExecuteConsumer = (db, grapher) => (req, res, next) => {
  const json = JSON.stringify(req.body)
  const hash = hashData(json)
  const contracts = db.retrieve('contracts', hash).contracts
  const parsedContracts = mapContractObjectToContractArray(contracts)

  const startTime = Date.now()
  execute(parsedContracts, (err, results) => {

    forEach(results, result => {
      const testOutcome = result.err ? 'fail' : 'pass'
      const totalTime = Date.now() - startTime
      const contractName = result.contract.name.replace(/\//g, '_')
      grapher.timing(`consumer.${result.contract.consumer}.${contractName}.${testOutcome}`, totalTime)
    })

    res.status(201).send(results.map(mapResult))
    next()
  })
}

module.exports = createExecuteConsumer
