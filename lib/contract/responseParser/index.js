'use strict'

const Joi = require('joi')
const compileField = require('../../dsl')

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
      parsed.body = compileField(response.body)
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
    if (Array.isArray(item)) {
      return parseArray(item)
    } else if (typeof item === 'object') {
      return parseObject(item)
    } else {
      return compileField(item)
    }
  })

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
      return compileField(object[key])
    }
  })

  return Joi.object(keys.reduce((acc, key, index) => {
    acc[key] = joiSpec[index]
    return acc
  }, {})).unknown(true)
}
