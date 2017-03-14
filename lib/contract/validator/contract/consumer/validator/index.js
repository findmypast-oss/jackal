'use strict'

const { validateNearley } = require('../../../lib')
const grammar = require('../grammar')

module.exports = consumer => validateNearley(grammar)(consumer)
