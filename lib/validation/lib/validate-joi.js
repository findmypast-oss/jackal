'use strict'

const Joi = require('joi')

const mapErrorDetails = (d) => `${d.message}`

const buildJoiError = (error) => {
  return {
    name: error.name,
    message: error.details.map(mapErrorDetails).join(',\n')
  }
}

const validateJoi = (schema) => (object) => {
  const res = Joi.validate(object, schema)

  return {
    valid: res.error === null,
    error: res.error === null ? null : buildJoiError(res.error)
  }
}

module.exports = validateJoi
