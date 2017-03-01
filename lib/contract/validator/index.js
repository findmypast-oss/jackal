'use strict'

const validateContract = require('./contract')
const validateRequest = require('./request')
const validateResponse = require('./response')

const buildErrors = validations => {
  return validations
    .map(v => v.error)
    .filter(v => v !== null)
    .filter(v => v.message !== '\t"value" must be an object')
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
