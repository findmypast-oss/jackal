'use strict'

const mapContractObjectToArray = require('../../../lib/map-contract-object-to-array')
const parseContract = require('../../../lib/parse-contract')
const isUnsupported = require('../../../lib/is-unsupported')

const validateUnsupportedContract = (req, res, next) => {
  const contracts = req.body

  const parsedContracts = mapContractObjectToArray(contracts, parseContract)
  const unsupportedContract = parsedContracts.find(findUnsupported)

  if (unsupportedContract) {
    res.status(400).send(unsupportedContract.response)
  } else {
    next()
  }
}

module.exports = validateUnsupportedContract

const findUnsupported = (contract) => isUnsupported(contract.response)
