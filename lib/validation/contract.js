'use strict'

const Joi = require('joi')
const validateJoi = require('./lib/validate-joi')

const contractSchema = Joi.object().keys({
  before: Joi.array().items([Joi.object()]).optional(),
  after: Joi.array().items([Joi.object()]).optional(),
  request: Joi.object().required(),
  response: Joi.object().required()
})

module.exports = validateJoi(contractSchema)
