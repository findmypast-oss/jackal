'use strict'

const coll = 'contracts'
const { cached, execute, hashData, insert, mapResult, parseResponse, retrieve, validate } = require('../../../lib/contract')
const { isMalformed, isUnsupported } = require('../../../lib/contract/responseParser/joiParser/errors')

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
      const parsedResponse = parseResponse(contract.response)

      return {
        name: contract.name,
        consumer: contract.consumer,
        before: contract.before,
        request: contract.request,
        response: parsedResponse.valid ? parsedResponse.response : parsedResponse.error
      }
    })

    const malformedContract = parsedContracts.find(pc => isMalformed(pc.response.body))
    if (malformedContract) {
      res.status(400).send(malformedContract.response)

      return next()
    }

    const unsupportedContract = parsedContracts.find(pc => isUnsupported(pc.response.body))
    if (unsupportedContract) {
      res.status(400).send(unsupportedContract.response)

      return next()
    }

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
