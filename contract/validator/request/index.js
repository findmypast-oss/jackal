'use strict'

const Joi = require('joi')
const validate = require('../lib')

const httpVerbs = [
  'CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE'
]

const requestSchema = Joi.object().keys({
  url: Joi.string().uri().required(),
  method: Joi.string().valid(httpVerbs).default('GET').optional(),
  headers: Joi.object().optional(),
  body: Joi.string().optional()
})

module.exports = validate(requestSchema)
