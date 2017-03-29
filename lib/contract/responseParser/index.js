'use strict'

const Joi = require('joi')
const parseJoi = require('./joiParser')
const { isMalformed, isUnsupported } = require('./joiParser/errors')

const parseResponse = response => {
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

const parseArray = array => {
  const joiSpec = array.map(item => {
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

const parseObject = object => {
  const keys = Object.keys(object)

  const joiSpec = keys.map(key => {
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

  return Joi.object(keys.reduce((acc, key, index) => {
    acc[key] = joiSpec[index]
    return acc
  }, {})).unknown(true)
}
