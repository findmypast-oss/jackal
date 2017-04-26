'use strict'

const validateContract = require('./contract')
const validateRequest = require('./request')
const validateResponse = require('./response')

const validationKeys = [ 'Contract', 'Request', 'Response' ]

const buildErrorName = (name, index) => {
  return `${validationKeys[index]}${name}`
}

const mapValidationError = (validation, index) => {
  return validation === null
    ? null
    : { name: buildErrorName(validation.name, index), message: validation.message }
}

const buildErrors = (validations) => {
  return validations
    .map((v) =>v.error )
    .map(mapValidationError)
    .filter((v) =>v !== null )
    .filter((v) =>v.message !== '"value" must be an object' )
}

module.exports = (contract, consumer, provider, api, scenario) => {
  const name = `${provider}/${api}/${scenario} <- ${consumer}`

  const validations = [
    validateContract(contract),
    validateRequest(contract.request),
    validateResponse(contract.response)
  ]

  return validations.every((v) => v.valid )
    ? { contract: name, valid: true, errors: null }
    : { contract: name, valid: false, errors: buildErrors(validations) }
}
