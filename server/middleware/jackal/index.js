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
    if (results.every(r => r.err === null)) {
      res.status(201).send('Contracts executed successfully')
      next()
    } else {
      res.status(400).send('Contracts failed to execute')
      next()
    }
  })
}

module.exports = jackal
