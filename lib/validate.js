'use strict'

const validateContract = require('./validation/contract')
const validateRequest = require('./validation/request')
const validateResponse = require('./validation/response')

const validationKeys = [ 'Contract', 'Request', 'Response' ]

const buildErrorName = function (name, index) {
  return `${validationKeys[index]}${name}`
}

const mapValidationError = function (validation, index) {
  return validation === null
    ? null
    : { name: buildErrorName(validation.name, index), message: validation.message }
}

const buildErrors = function (validations) {
  return validations
    .map(function (v) { return v.error })
    .map(mapValidationError)
    .filter(function (v) { return v !== null })
    .filter(function (v) { return v.message !== '"value" must be an object' })
}

const validate = function (contract) {
  const validations = [
    validateContract(contract),
    validateRequest(contract.request),
    validateResponse(contract.response)
  ]

  return validations.every(function (v) { return v.valid })
    ? { valid: true, errors: null }
    : { valid: false, errors: buildErrors(validations) }
}

module.exports = validate
