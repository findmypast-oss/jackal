'use strict'

const coll = 'contracts'
const { cached, execute, hashData, insert, retrieve, validate } = require('../../../lib/contract')

const jackal = (req, res, next) => {
  const contracts = req.body

  if (contracts.length === 0) {
    res.status(400).send('No contracts received')
    
    return next()
  }

  const json = JSON.stringify(contracts)
  const hash = hashData(json)

  if (!cached(coll, hash)) {
    const validations = contracts.map(validate)

    if (!validations.every(v => v.valid)) {
      const validationHeader = { 'Content-Type': 'application/json' }
      res.set(validationHeader).status(400).send(validations)

      return next()
    }

    if (!insert(coll, hash, contracts)) {
      res.status(500).send('Cache failed on contracts insertion')

      return next()
    }
  }

  const cacheObject = retrieve(coll, hash)

  if (cacheObject.hash !== hash) {
    res.status(500).send('Cache failed on contracts retrieval')

    return next()
  }

  execute(cacheObject.contracts, (err, results) => {
    if (results.every(r => r.err === null)) {
      res.status(201).send('Contracts executed successfully')
    } else {
      res.status(400).send('Contracts failed to execute')
    }
  })

  return next()
}

module.exports = jackal
