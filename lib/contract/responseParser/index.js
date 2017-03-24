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
      const compiledField = compileField(response.body)

      if (isCompilationError(compiledField)) {
        return { value: false, error: compiledField, response: null }
      }

      parsed.body = compiledField
    }
  }

  if (response.headers) {
    const compiledField = compileField(response.headers)

    if (isCompilationError(compiledField)) {
      return { value: false, error: compiledField, response: null }
    }

    parsed.headers = compiledField
  }

  return {
    valid: true,
    error: null,
    response: parsed
  }
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

  const compileError = joiSpec.find(isCompilationError)

  return compileError ? compileError : Joi.array().items(joiSpec)
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

  const compileError = joiSpec.find(isCompilationError)

  return compileError ? compileError : Joi.object(keys.reduce((acc, key, index) => {
    acc[key] = joiSpec[index]
    return acc
  }, {})).unknown(true)
}

const isCompilationError = value => {
  const name = value.name && value.name === 'DSL Error'
  const msg = value.message && value.message === 'Response could not be compiled. Please see the DSL documentation: https://github.com/findmypast-oss/jackal/blob/master/dsl.md'

  return name && msg
}
