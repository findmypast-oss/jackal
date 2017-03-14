'use strict'

const Joi = require('joi')
const nearley = require('nearley')

const buildError = error => {
  return {
    name: error.name,
    message: error.details.map(d => `${d.message}`).join(',\n')
  }
}

const validateJoi = schema => object => {
  const res = Joi.validate(object, schema)

  return {
    valid: res.error === null,
    error: res.error === null ? null : buildError(res.error)
  }
}

const validateNearley = grammar => candidate => {
  const parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)

  try {
    parser.feed(candidate)
  } catch (e) {
    return false
  }

  return parser.results.length > 0
}

module.exports = { validateJoi, validateNearley }
