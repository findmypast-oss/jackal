'use strict'

const Joi = require('joi')

const contractSchema = Joi.object().keys({
  name: Joi.string().required(),
  consumer: Joi.string().required(),
  request: Joi.string().required(),
  response: Joi.object().required()
})

const buildError = error => {
  return {
    name: error.name,
    message: error.details.map(d => `\t${d.message}`).join(', ')
  }
}

const validateContract = contract => {
  const res = Joi.validate(contract, contractSchema)

  return {
    valid: res.error === null,
    error: res.error === null ? null : buildError(res.error)
  }
}

module.exports = validateContract
