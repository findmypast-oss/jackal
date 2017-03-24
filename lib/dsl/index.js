'use strict'

const generate = require('./generator')
const parse = require('./parser')

const compileField = field => {
  const tokens = parse(field)

  return generate(tokens)
}

module.exports = compileField
