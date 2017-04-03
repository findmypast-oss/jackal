'use strict'

const Joi = require('joi')

const mapErrorDetails = function (d) {
  return `${d.message}`
}

const buildJoiError = function (error) {
  return {
    name: error.name,
    message: error.details.map(mapErrorDetails).join(',\n')
  }
}

const validateJoi = function (schema) {
  return function (object) {
    const res = Joi.validate(object, schema)

    return {
      valid: res.error === null,
      error: res.error === null ? null : buildJoiError(res.error)
    }
  }
}

module.exports = validateJoi
