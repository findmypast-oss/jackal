'use strict'

const blacklist = [
  'version', 'validate', 'compile', 'assert', 'attempt', 'ref', 'isRef',
  'reach', 'extend', 'lazy'
]

const isBlacklisted = value => blacklist.includes(value)

module.exports = isBlacklisted
