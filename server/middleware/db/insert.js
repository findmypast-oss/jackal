'use strict'

const hashData = require('../../../lib/hash-data')

const createDbInsert = (db) => (req, res) => {
  const contracts = req.body
  const json = JSON.stringify(contracts)
  const hash = hashData(json)

  if (db.insert('contracts', hash, contracts)) {
    const body = {
      message: 'All Passed',
      status: 'PASSED',
      results: req.contractResults
    }

    res.status(201).send(body)
  } else {
    const body = {
      message: 'Cache failed on contracts insertion',
      status: 'ERROR',
      results: []
    }

    res.status(500).send(body)
  }
}

module.exports = createDbInsert
