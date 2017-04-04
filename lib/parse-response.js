'use strict'

const Joi = require('joi')

const isMalformed = require('./is-malformed')
const isUnsupported = require('./is-unsupported')
const parseJoi = require('./parse-response/parse-joi')

const parseResponse = function (response) {
  const parsed = {
    statusCode: response.statusCode
  }

  if (response.body) {
    if (Array.isArray(response.body)) {
      parsed.body = parseArray(response.body)
    } else if (typeof response.body === 'object') {
      parsed.body = parseObject(response.body)
    } else {
      const parsedField = parseJoi(response.body)

      if (isMalformed(parsedField) || isUnsupported(parsedField)) {
        return { value: false, error: parsedField, response: null }
      }

      parsed.body = parsedField
    }
  }

  if (response.headers) {
    const parsedField = parseJoi(response.headers)

    if (isMalformed(parsedField) || isUnsupported(parsedField)) {
      return { value: false, error: parsedField, response: null }
    }

    parsed.headers = parsedField
  }

  return { valid: true, error: null, response: parsed }
}

module.exports = parseResponse

const parseArray = function (array) {
  const joiSpec = array.map(function (item) {
    if (Array.isArray(item)) {
      return parseArray(item)
    } else if (typeof item === 'object') {
      return parseObject(item)
    } else {
      return parseJoi(item)
    }
  })

  const malformed = joiSpec.find(isMalformed)
  if (malformed) { return malformed }

  const unsupported = joiSpec.find(isUnsupported)
  if (unsupported) { return unsupported }

  return Joi.array().items(joiSpec)
}

const parseObject = function (object) {
  const keys = Object.keys(object)

  const joiSpec = keys.map(function (key) {
    if (Array.isArray(object[key])) {
      return parseArray(object[key])
    } else if (typeof object[key] === 'object') {
      return parseObject(object[key])
    } else {
      return parseJoi(object[key])
    }
  })

  const malformed = joiSpec.find(isMalformed)
  if (malformed) { return malformed }

  const unsupported = joiSpec.find(isUnsupported)
  if (unsupported) { return unsupported }

  return Joi.object(keys.reduce(function (acc, key, index) {
    acc[key] = joiSpec[index]
    return acc
  }, {})).unknown(true)
}