'use strict'

const validate = require('../../../lib/validate')
const mapValidation = require('../../../lib/validation/map-validations')
const flattenDeep = require('lodash/flattenDeep')

const validateContracts = (req, res, next) => {
  const contracts = req.body
  const validations = validationsForContracts(contracts)

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

const validationsForContracts = (contracts) => {
  const consumer = Object.keys(contracts)[0]
  const providers = Object.values(contracts[consumer])
  const nestedValidations = providers.map((provider) => {
    const apis = Object.values(provider)

    return apis.map((api) => {
      const scenarios = Object.values(api)

      return scenarios.map(validate)
    })
  })

  return flattenDeep(nestedValidations)
}
