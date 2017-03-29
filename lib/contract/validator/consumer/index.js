'use strict'

const validateNearley = require('../lib').validateNearley
const grammar = require('./grammar')

module.exports = validateNearley(grammar)
