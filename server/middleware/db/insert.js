'use strict'

const hashData = require('../../../lib/hash-data')

const createDbInsert = (db) => (req, res) => {
  const contracts = req.body
  const json = JSON.stringify(contracts)
  const hash = hashData(json)

  if (db.insert('contracts', hash, contracts)) {
    res.status(201).send(req.contractResults)
  } else {
    res.status(500).send({ message: 'Cache failed on contracts insertion' })
  }
}

module.exports = createDbInsert
