'use strict'

const Joi = require('joi')
const validateJoi = require('./lib/validate-joi')

const httpVerbs = [
  'CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE'
]

const httpStatusCodes = [
  100, 101, 102, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302,
  303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409,
  410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 426, 428, 429,
  431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511
]

const hookSchema = Joi.object().keys({
  name: Joi.string().required(),
  request: Joi.object().keys({
    baseUrl: Joi.string().uri().required(),
    path: Joi.string().optional(),
    query: Joi.string().optional(),
    method: Joi.string().valid(httpVerbs).optional(),
    headers: Joi.object().optional(),
    body: Joi.alternatives([Joi.string(), Joi.object(), Joi.array()]).optional(),
    timeout: Joi.number().integer().optional(),
    rejectUnauthorized: Joi.boolean().optional()
  }).required(),
  response: Joi.object().keys({
    statusCode: Joi.number().integer().valid(httpStatusCodes).required()
  }).required(),
  variables: Joi.object().optional()
})

module.exports = validateJoi(hookSchema)
