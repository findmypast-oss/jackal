'use strict'

const coll = 'contracts'
const { cached, execute, hashData, insert, mapResult, parseResponse, retrieve, validate } = require('../../../lib/contract')

const jackal = (req, res, next) => {
  const contracts = req.body

  if (contracts.length === undefined || contracts.length === 0) {
    res.status(400).send({ message: 'No contracts received' })

    return next()
  }

  const json = JSON.stringify(contracts)
  const hash = hashData(json)

  if (!cached(coll, hash)) {
    const validations = contracts.map(validate)

    if (!validations.every(v => v.valid)) {
      res.status(400).send({
        message: "One or more contracts are invalid",
        validations: validations.map((v, i) => {
          const contract = contracts[i]

          return {
            contract: `${contract.name} <- ${contract.consumer}`,
            valid: v.valid,
            errors: v.errors
          }
        })
      })

      return next()
    }

    const parsedContracts = contracts.map(contract => {
      return {
        name: contract.name,
        consumer: contract.consumer,
        request: contract.request,
        response: parseResponse(contract.response)
      }
    })

    if (!insert(coll, hash, parsedContracts)) {
      res.status(500).send({ message: 'Cache failed on contracts insertion' })

      return next()
    }
  }

  const cacheObject = retrieve(coll, hash)

  if (cacheObject.hash !== hash) {
    res.status(500).send({ message: 'Cache failed on contracts retrieval' })

    return next()
  }

  execute(cacheObject.contracts, (err, results) => {
    res.status(201).send(results.map(mapResult))

    return next()
  })
}

module.exports = jackal
