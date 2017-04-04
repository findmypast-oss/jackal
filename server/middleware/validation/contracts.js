'use strict'

const validate = require('../../../lib/validate')
const mapValidation = require('../../../lib/validation/map-validations')
const mapContractObjectToArray = require('../../../lib/map-contract-object')

const validateContracts = (req, res, next) => {
  const contracts = req.body
  const validations = mapContractObjectToArray(contracts, validate)

  if (allValid(validations)) {
    next()
  } else {
    res.status(400).send(buildValidationsResponse(validations))
  }
}

module.exports = validateContracts

const buildValidationsResponse = validations => {
  return {
    message: "One or more contracts are invalid",
    validations: buildValidations(validations)
  }
}

const buildValidations = validations => validations.map(mapValidation)

const allValid = validations => validations.every(isValid)
const isValid = validation => validation.valid
