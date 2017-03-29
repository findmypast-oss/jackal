'use strict'

const contract = require('../../../lib/contract')

const execute = contract.execute
const mapResult = contract.mapResult
const retrieveCollection = contract.retrieveCollection

const mapContractObject = function (contractObject) {
  return contractObject.contract
}

const buildMessage = function (provider) {
  return { message: `No contracts exist for provider: ${provider}` }
}

const claude = function (req, res, next) {
  const provider = req.params.provider
  const contracts = retrieveCollection(provider).map(mapContractObject)

  if (contracts.length === 0) {
    res.status(200).send(buildMessage(provider))

    return next()
  } else {
    execute(contracts, function (err, results) {
      res.status(200).send(results.map(mapResult))

      return next()
    })
  }
}

module.exports = claude
