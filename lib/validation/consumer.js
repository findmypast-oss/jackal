'use strict'

const validateNearley = require('./lib/validate-nearley')
const grammar = require('./consumer-grammar')

module.exports = validateNearley(grammar)
