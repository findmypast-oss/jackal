'use strict'

const compileBody = require('./compile-body')

module.exports = (body) => {
  const sanitised = requestBodyShouldBeSerialized(body)
    ? JSON.stringify(body)
    : body

  return typeof sanitised === 'string' ? compileBody(sanitised) : sanitised
}

const requestBodyShouldBeSerialized = (body) => {
  return body && (Array.isArray(body) || typeof body === 'object')
}
