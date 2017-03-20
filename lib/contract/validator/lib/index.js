'use strict'

const Joi = require('joi')
const nearley = require('nearley')

const buildJoiError = error => {
  return {
    name: error.name,
    message: error.details.map(d => `${d.message}`).join(',\n')
  }
}

const validateJoi = schema => object => {
  const res = Joi.validate(object, schema)

  return {
    valid: res.error === null,
    error: res.error === null ? null : buildJoiError(res.error)
  }
}

const fieldSyntaxes = {
  consumer: '<consumer>',
  name: '<apiName> | <provider>'
}

const buildNearleyError = (candidate, field) => {
  return {
    name: 'ValidationError',
    message: `${candidate} is invalid, '${field}' should be in format '${fieldSyntaxes[field]}' where [a-zA-Z0-9_] are valid parameter characters`
  }
}

const validateNearley = grammar => (candidate, field) => {
  const parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)

  try {
    parser.feed(candidate)
  } catch (e) {
    return {
      valid: false,
      error: buildNearleyError(candidate, field)
    }
  }

  return {
    valid: parser.results.length > 0,
    error: parser.results.length > 0 ? null : buildNearleyError(candidate, field)
  }
}

module.exports = { validateJoi, validateNearley }
