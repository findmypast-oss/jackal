'use strict'

const validateNearley = require('./lib/validate-nearley')
const grammar = require('./name-grammar')

module.exports = validateNearley(grammar)
