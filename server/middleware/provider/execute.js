'use strict'

const execute = require('../../../lib/contract/executor')
const mapResult = require('../../../lib/contract/map-result')
const parseContract = require('../../../lib/contract/parse-contract')

const createExecuteProvider = (db) => (req, res, next) => {
  const provider = req.params.provider
  const contracts = db.retrieveCollection(provider).map(dbo => dbo.contract)
  const parsedContracts = contracts.map(parseContract)

  execute(parsedContracts, (err, results) => {
    res.status(200).send(results.map(mapResult))

    next()
  })
}

module.exports = createExecuteProvider
