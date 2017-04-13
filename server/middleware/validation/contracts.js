'use strict'

const validate = require('../../../lib/validate')
const mapContractObjectToArray = require('../../../lib/map-contract-object-to-array')

const validateContracts = (req, res, next) => {
  const contracts = req.body
  const validations = mapContractObjectToArray(contracts, validate)

  if (validations.length > 0 && allValid(validations)) {
    next()
  } else {
    res.status(400).send(buildValidationsResponse(validations))
  }
}

module.exports = validateContracts

const buildValidationsResponse = validations => {
  return {
    message: 'One or more contracts are invalid',
    status: 'INVALID',
    results: buildValidations(validations)
  }
}

const buildValidations = validations => {
  return validations.length > 0
    ? validations
    : { contract: 'N/A', valid: false, errors: [ { name: 'IncompleteContract', message: 'Incomplete Contract Object Received' } ] }
}

const allValid = validations => validations.every(isValid)
const isValid = validation => validation.valid
