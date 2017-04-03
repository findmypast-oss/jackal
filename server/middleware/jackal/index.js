'use strict'

const coll = 'contracts'
const contract = require('../../../lib/contract')
const errors = require('../../../lib/contract/responseParser/joiParser/errors')

const execute = contract.execute
const hashData = contract.hashData
const mapResult = contract.mapResult
const parseResponse = contract.parseResponse
const validate = contract.validate

const isMalformed = errors.isMalformed
const isUnsupported = errors.isUnsupported

const createJackal = function (db) {
  return function (req, res, next) {
    const contracts = req.body

    if (contracts.length === undefined || contracts.length === 0) {
      res.status(400).send({ message: 'No contracts received' })

      return next()
    }

    const json = JSON.stringify(contracts)
    const hash = hashData(json)

    if (!db.cached(coll, hash)) {
      const validations = contracts.map(validate)

      if (!validations.every(function (v) { return v.valid })) {
        res.status(400).send({
          message: "One or more contracts are invalid",
          validations: validations.map(function (v, i) {
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

      if (!db.insert(coll, hash, contracts)) {
        res.status(500).send({ message: 'Cache failed on contracts insertion' })

        return next()
      }
    }

    const dbo = db.retrieve(coll, hash)

    if (dbo.hash !== hash) {
      res.status(500).send({ message: 'Cache failed on contracts retrieval' })

      return next()
    }

    const parsedContracts = dbo.contracts.map(function (contract) {
      const parsedResponse = parseResponse(contract.response)

      return {
        name: contract.name,
        consumer: contract.consumer,
        before: contract.before,
        request: contract.request,
        response: parsedResponse.valid ? parsedResponse.response : parsedResponse.error
      }
    })

    const malformedContract = parsedContracts.find(findMalformed)
    if (malformedContract) {
      res.status(400).send(malformedContract.response.body)

      return next()
    }

    const unsupportedContract = parsedContracts.find(findUnsupported)
    if (unsupportedContract) {
      res.status(400).send(unsupportedContract.response.body)

      return next()
    }

    execute(parsedContracts, function (err, results) {
      res.status(201).send(results.map(mapResult))

      return next()
    })
  }
}

module.exports = createJackal

const findMalformed = function (contract) {
  return isMalformed(contract.response.body)
}

const findUnsupported = function (contract) {
  return isUnsupported(contract.response.body)
}
