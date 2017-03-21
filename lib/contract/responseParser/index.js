'use strict'

const Joi = require('joi')

const parseResponse = response => {
  const parsed = {
    statusCode: response.statusCode
  }

  if (response.body) {
    if (typeof response.body === 'object') {
      parsed.body = parseKeys(response.body)
    } else if (response.body.startsWith('Joi')) {
      parsed.body = eval(response.body)
    } else {
      parsed.body = response.body
    }
  }

  if (response.headers) {
    parsed.headers = parseKeys(response.headers)
  }

  return parsed
}

module.exports = parseResponse

const parseKeys = object => {
  const keys = Object.keys(object)

  const joiSpec = keys.map(key => {
    if (typeof object[key] === 'object') {
      return parseKeys(object[key])
    } else if (object[key].startsWith('Joi')) {
      return eval(object[key])
    } else {
      return object[key]
    }
  })

  return Joi.object(keys.reduce((acc, key, index) => {
    acc[key] = joiSpec[index]
    return acc
  }, {})).unknown(true)
}
