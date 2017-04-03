'use strict'

const execute = require('../../../lib/contract/executor')
const parseContract = require('../../../lib/contract/parse-contract')
const mapResult = require('../../../lib/contract/map-result')

const executeConsumer = (req, res, next) => {
  const contracts = req.body
  const parsedContracts = contracts.map(parseContract)

  execute(parsedContracts, (err, results) => {
    res.status(201).send(results.map(mapResult))
    next()
  })
}

module.exports = executeConsumer
