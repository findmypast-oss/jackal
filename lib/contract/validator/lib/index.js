'use strict'

const Joi = require('joi')

const buildError = error => {
  return {
    name: error.name,
    message: error.details.map(d => `\t${d.message}`).join(',\n')
  }
}

const validate = schema => object => {
  const res = Joi.validate(object, schema)

  return {
    valid: res.error === null,
    error: res.error === null ? null : buildError(res.error)
  }
}

module.exports = validate
