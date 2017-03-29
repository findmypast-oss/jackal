'use strict'

const Joi = require('joi')
const nearley = require('nearley')

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

const fieldSyntaxes = {
  consumer: '<consumer>',
  name: '<provider>/<apiName>'
}

const buildNearleyError = function (candidate, field, customErr) {
  const generalErr = `${candidate} is invalid, '${field}' should be in format '${fieldSyntaxes[field]}' where [a-z0-9_] are valid parameter characters`

  return {
    name: 'ValidationError',
    message: customErr ? customErr : generalErr
  }
}

const validateNearley = function (grammar) {
  return function (candidate, field, customErr) {
    const parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)

    try {
      parser.feed(candidate)
    } catch (e) {
      return {
        valid: false,
        error: buildNearleyError(candidate, field, customErr)
      }
    }

    return {
      valid: parser.results.length > 0,
      error: parser.results.length > 0 ? null : buildNearleyError(candidate, field, customErr)
    }
  }
}

module.exports = { validateJoi, validateNearley }
