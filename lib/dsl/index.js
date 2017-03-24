'use strict'

const generate = require('./generator')
const parse = require('./parser')

const compileError = {
  name: 'DSL Error',
  message: 'Response could not be compiled. Please see the DSL documentation: https://github.com/findmypast-oss/jackal/blob/master/dsl.md'
}

const compileField = field => {
  const tokens = parse(field)

  return tokens.length === 0 ? compileError : generate(tokens)
}

module.exports = compileField
