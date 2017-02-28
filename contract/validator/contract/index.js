'use strict'

const Joi = require('joi')
const buildError = require('../utils')

const contractSchema = Joi.object().keys({
  name: Joi.string().required(),
  consumer: Joi.string().required(),
  request: Joi.object().required(),
  response: Joi.object().required()
})

const validateContract = contract => {
  const res = Joi.validate(contract, contractSchema)

  return {
    valid: res.error === null,
    error: res.error === null ? null : buildError(res.error)
  }
}

module.exports = validateContract
