'use strict'

const Joi = require('joi')

const parseResponse = response => {
  const parsed = {
    statusCode: response.statusCode
  }

  if (response.body) {
    if (typeof response.body === 'object') {
      parsed.body = parseObject(response.body)
    } else if (Array.isArray(response.body)) {
      parsed.body = parseArray(response.body)
    } else if (response.body.startsWith('Joi')) {
      parsed.body = eval(response.body)
    } else {
      parsed.body = response.body
    }
  }

  if (response.headers) {
    parsed.headers = parseObject(response.headers)
  }

  return parsed
}

module.exports = parseResponse

const parseArray = array => {
  const joiSpec = array.map(item => {
    if (typeof item === 'object') {
      return parseObject(item)
    } else if (Array.isArray(item)) {
      return parseArray(item)
    } else if (item.startsWith('Joi')) {
      return eval(item)
    } else {
      return item
    }
  })

  return Joi.array().items(...joiSpec)
}

const parseObject = object => {
  const keys = Object.keys(object)

  const joiSpec = keys.map(key => {
    if (typeof object[key] === 'object') {
      return parseObject(object[key])
    } else if (Array.isArray(object[key])) {
      return parseArray(object[key])
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
