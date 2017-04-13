'use strict'

const forEach = require('lodash/forEach')
const mapResult = require('../../../lib/map-result')
const execute = require('../../../lib/contract/executor')
const mapContractObjectToContractArray = require('../../../lib/map-contract-object-to-contract-array')

const createExecuteConsumer = (grapher) => (req, res, next) => {
  const contracts = req.body
  const parsedContracts = mapContractObjectToContractArray(contracts)

  const startTime = Date.now()
  execute(parsedContracts, (err, results) => {
    forEach(results, result => {
      const testOutcome = result.err ? 'fail' : 'pass'
      const totalTime = Date.now() - startTime
      const contractName = result.contract.name.replace(/\//g, '_')
      grapher.timing(`consumer.${result.contract.consumer}.${contractName}.${testOutcome}`, totalTime)
    })

    const mappedResults = results.map(mapResult)

    if (mappedResults.some(result => result.status === 'Fail')) {
      res.status(200).send(mappedResults)
    } else {
      req.contractResults = mappedResults
      next()
    }
  })
}

module.exports = createExecuteConsumer
