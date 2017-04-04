'use strict'

const Joi = require('joi')
const validateJoi = require('./lib/validate-joi')

const contractSchema = Joi.object().keys({
  name: Joi.string().required(),
  before: Joi.array().items([Joi.object()]).optional(),
  consumer: Joi.string().required(),
  request: Joi.object().required(),
  response: Joi.object().required()
})

module.exports = validateJoi(contractSchema)
