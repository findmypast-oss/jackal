'use strict'

const mapResult = require('../../../lib/map-result')
const execute = require('../../../lib/contract/executor')
const mapContractObjectToContractArray = require('../../../lib/map-contract-object-to-contract-array')

const executeConsumer = (req, res, next) => {
  const contracts = req.body
  const parsedContracts = mapContractObjectToContractArray(contracts)

  execute(parsedContracts, (err, results) => {
    const mappedResults = results.map(mapResult)

    if (mappedResults.some(result => result.status === 'Fail')) {
      res.status(418).send(mappedResults)
    } else {
      req.contractResults = mappedResults
      next()
    }
  })
}

module.exports = executeConsumer
