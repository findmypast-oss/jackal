'use strict'

const { validateNearley } = require('../../../lib')
const grammar = require('../grammar')

module.exports = name => validateNearley(grammar)(name)
