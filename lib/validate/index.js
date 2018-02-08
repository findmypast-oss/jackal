'use strict'

const _ = require('lodash')
const validateContract = require('./contract')
const validateRequest = require('./request')
const validateResponse = require('./response')
const validateHook = require('./hook')

const buildError = (validation, index, errors) => {
  let errName

  if (index === 0)                      { errName = 'Contract' }
  else if (index === errors.length - 2) { errName = 'Request' }
  else if (index === errors.length - 1) { errName = 'Response' }
  else                                  { errName = 'Hook' }

  return { name: `${errName}${validation.name}`, message: validation.message }
}

const mapValidationError = (validation, index, errors) => {
  return validation === null
    ? null
    : buildError(validation, index, errors)
}

const buildErrors = (validations) => {
  return validations
    .map((v) => v.error)
    .map(mapValidationError)
    .filter((v) => v !== null)
    .filter((v) => v.message !== '"value" must be an object' )
}

const buildHookValidations = (hookArray) => {
  return hookArray
    ? hookArray.map(validateHook)
    : { valid: true, error: null }
}

module.exports = (contract, consumer, provider, api, scenario) => {
  const name = `${provider}/${api}/${scenario} <- ${consumer}`

  const validations = _.flattenDeep([
    validateContract(contract),
    buildHookValidations(contract.before),
    buildHookValidations(contract.after),
    validateRequest(contract.request),
    validateResponse(contract.response)
  ])

  return validations.every((v) => v.valid )
    ? { contract: name, valid: true, errors: null }
    : { contract: name, valid: false, errors: buildErrors(validations) }
}
