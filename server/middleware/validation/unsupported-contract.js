'use strict'

const mapContractObjectToArray = require('../../../lib/map-contract-object-to-array')
const parseContract = require('../../../lib/parse-contract')
const isUnsupported = require('../../../lib/errors/is-unsupported')

const validateUnsupportedContract = (req, res, next) => {
  const contracts = req.body

  const parsedContracts = mapContractObjectToArray(contracts, parseContract)
  const unsupportedContracts = parsedContracts.filter(filterUnsupported)

  if (unsupportedContracts.length > 0) {
    const unsupportedResponse = {
      message: 'One or more contracts are invalid',
      status: 'INVALID',
      results: unsupportedContracts.map(mapUnsupported)
    }

    res.status(400).send(unsupportedResponse)
  } else {
    next()
  }
}

module.exports = validateUnsupportedContract

const filterUnsupported = (contract) => {
  if (contract.response.body) { return isUnsupported(contract.response.body) }

  return false
}

const mapUnsupported = (contract) => {
  return {
    contract: `${contract.name} <- ${contract.consumer}`,
    valid: false,
    errors: [ contract.response.body ]
  }
}
