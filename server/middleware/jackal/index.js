'use strict'

const { cached, execute, hashContracts, insert, retrieve, validate } = require('../../../lib/contract')

const jackal = (req, res, next) => {
  const contracts = req.body

  if (contracts.length === 0) {
    res.status(400).send('No contracts received')
    next()
  }

  const json = JSON.stringify(contracts)
  const hash = hashContracts(json)

  if (!cached(hash)) {
    const validations = contracts.map(validate)

    if (!validations.every(v => v.valid)) {
      res.status(400).send(validations)
      next()
    }

    if (!insert(hash, contracts)) {
      res.status(500).send('Cache failed on contracts insertion')
      next()
    }
  }

  const cacheObject = retrieve(hash)

  if (cacheObject.hash !== hash) {
    res.status(500).send('Cache failed on contracts retrieval')
    next()
  }

  execute(cacheObject.contracts, (err, results) => {
    if (err) {
      res.status(400).send('Contracts could not be executed')
      next()
    } else {
      res.status(201).send('Contracts executed')
      next()
    }
  })
}

module.exports = jackal
