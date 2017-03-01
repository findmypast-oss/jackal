'use strict'

const Joi = require('joi')
const validate = require('../lib')

const contractSchema = Joi.object().keys({
  name: Joi.string().required(),
  consumer: Joi.string().required(),
  request: Joi.object().required(),
  response: Joi.object().required()
})

module.exports = validate(contractSchema)
