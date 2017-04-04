'use strict'

const Joi = require('joi')

const isBlacklisted = require('./blacklist')
const errors = require('./errors')
const sanitiseParameter = require('./sanitise-parameter')
const tokenise = require('./tokenise')

const malformed = errors.malformed
const unsupported = errors.unsupported

const parseJoi = function (value) {
  if (!value.startsWith('Joi.')) { return malformed }
  const tokens = tokenise(value.substr(4))

  return parseTokens(tokens, null)
}

module.exports = parseJoi

const parseTokens = function (tokens, func) {
  if (tokens.length === 0) { return func }

  const token = tokens.splice(0, 1)[0]
  const openParensIx = token.indexOf('(')
  if (openParensIx === -1 || !token.endsWith(')')) { return malformed }

  const term = token.substring(0, openParensIx)
  if (isBlacklisted(term)) { return unsupported }

  let params = token.substring(openParensIx + 1, token.length - 1)
  const evaluated = evaluateParams(params)

  try {
    if (term === 'object' && typeof evaluated === 'object') {
      return parseTokens(tokens, Joi[term](evaluated))
    }

    if (func === null) {
      return parseTokens(tokens, Joi[term]())
    }

    return parseTokens(tokens, func[term](evaluated))
  } catch (e) {
    return malformed
  }
}

const evaluateParams = function (params) {
  if (isArray(params))  { return evaluateParamsArray(params) }
  if (isObject(params)) { return evaluateParamsObject(params) }

  return sanitiseParameter(params)
}

const evaluateParamsArray = function (params) {
  const array = params.substring(1, params.length - 1).split(',')

  return array.map(function (param) {
    const p = param.trim()

    if (typeof p === 'string' && p.startsWith('Joi.')) { return parseJoi(p) }

    return sanitiseParameter(p)
  })
}

const evaluateParamsObject = function (params) {
  const object = JSON.parse(params)
  const keys = Object.keys(object)

  keys.forEach(function (k) {
    const val = object[k].trim()

    object[k] = (typeof val === 'string' && val.startsWith('Joi.'))
      ? parseJoi(val)
      : sanitiseParameter(val)
  })

  return object
}

const isArray = function (value) {
  return value.startsWith('[') && value.endsWith(']')
}

const isObject = function (value) {
  return value.startsWith('{') && value.endsWith('}')
}
