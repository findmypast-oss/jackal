'use strict'

const hashData = require('../../../lib/hash-data')

const createDbConsistencyCheck = (db) => (req, res, next) => {
  const contracts = req.body
  const json = JSON.stringify(contracts)
  const hash = hashData(json)

  const dbo = db.retrieve('contracts', hash)

  if (dbo.hash === hash) {
    next()
  } else {
    res.status(500).send({ message: 'Cache failed on contracts retrieval' })
  }
}

module.exports = createDbConsistencyCheck
