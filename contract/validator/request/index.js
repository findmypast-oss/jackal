'use strict'

const Joi = require('joi')
const buildError = require('../utils')

const httpVerbs = [
  'CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE'
]

const requestSchema = Joi.object().keys({
  url: Joi.string().uri().required(),
  method: Joi.string().valid(httpVerbs).default('GET').optional(),
  headers: Joi.object().optional(),
  body: Joi.string().optional()
})

const validateRequest = request => {
  const res = Joi.validate(request, requestSchema)

  return {
    valid: res.error === null,
    error: res.error === null ? null : buildError(res.error)
  }
}

module.exports = validateRequest
