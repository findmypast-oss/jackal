'use strict'

const validateContract = require('./contract')
const validateRequest = require('./request')
const validateResponse = require('./response')

const validationKeys = [ 'Contract', 'Request', 'Response' ]

const buildErrorName = (name, index) => `${validationKeys[index]}${name}`

const mapValidationError = (validation, index) => {
  return validation === null
    ? null
    : { name: buildErrorName(validation.name, index), message: validation.message }
}

const buildErrors = validations => {
  return validations
    .map(v => v.error)
    .map(mapValidationError)
    .filter(v => v !== null)
    .filter(v => v.message !== '"value" must be an object')
}

const validate = contract => {
  const validations = [
    validateContract(contract),
    validateRequest(contract.request),
    validateResponse(contract.response)
  ]

  return validations.every(v => v.valid)
    ? { valid: true, errors: null }
    : { valid: false, errors: buildErrors(validations) }
}

module.exports = validate
