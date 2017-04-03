'use strict'

const contract = require('../../../lib/contract')

const execute = contract.execute
const mapResult = contract.mapResult
const parseResponse = contract.parseResponse

const mapContractObject = function (contractObject) {
  return contractObject.contract
}

const buildMessage = function (provider) {
  return { message: `No contracts exist for provider: ${provider}` }
}

const createClaude = function (db) {
  return function (req, res, next) {

    const provider = req.params.provider
    const contracts = db.retrieveCollection(provider).map(mapContractObject)

    if (contracts.length === 0) {
      res.status(200).send(buildMessage(provider))

      return next()
    } else {
      const parsedContracts = contracts.map(function (contract) {
        const parsedResponse = parseResponse(contract.response)

        return {
          name: contract.name,
          consumer: contract.consumer,
          before: contract.before,
          request: contract.request,
          response: parsedResponse.valid ? parsedResponse.response : parsedResponse.error
        }
      })

      execute(parsedContracts, function (err, results) {
        res.status(200).send(results.map(mapResult))

        return next()
      })
    }
  }
}

module.exports = createClaude
