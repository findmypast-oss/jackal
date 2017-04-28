'use strict'

const _ = require('lodash')

module.exports = (headers, variables) => {
  return _.mapValues(headers, compileHeader(variables))
}

const compileHeader = (variables) => (value) => _.template(value)(variables)
