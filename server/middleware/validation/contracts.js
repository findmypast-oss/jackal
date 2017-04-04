'use strict'

const validate = require('../../../lib/validate')
const mapValidation = require('../../../lib/validation/map-validations')
const flattenDeep = require('lodash/flattenDeep')
const map = require('lodash.map')

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
  const nestedValidations = map(contracts, (consumer, consumerName) => {
    return map(consumer, (provider, providerName) => {
      return map(provider, (api, apiName) => {
        return map(api, (scenario, scenarioName) => {
          return validate(scenario)
        })
      })
    })
  })

  return flattenDeep(nestedValidations)
}
