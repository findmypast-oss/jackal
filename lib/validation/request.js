'use strict'

const Joi = require('joi')
const validateJoi = require('./lib/validate-joi')

const httpVerbs = [
  'CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE'
]

const requestSchema = Joi.object().keys({
  baseUrl: Joi.string().uri().required(),
  path: Joi.string().optional(),
  query: Joi.string().optional(),
  method: Joi.string().valid(httpVerbs).default('GET').optional(),
  headers: Joi.object().optional(),
  body: Joi.alternatives([Joi.string(), Joi.object(), Joi.array()]).optional(),
  timeout: Joi.number().integer().optional()
})

module.exports = validateJoi(requestSchema)
