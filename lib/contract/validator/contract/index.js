'use strict'

const Joi = require('joi')
const { validateJoi } = require('../lib')

const contractSchema = Joi.object().keys({
  name: Joi.string().required(),
  consumer: Joi.string().required(),
  request: Joi.object().required(),
  response: Joi.object().required()
})

module.exports = validateJoi(contractSchema)
