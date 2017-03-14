'use strict'

const nearley = require('nearley')
const grammar = require('../grammar')

const validateName = consumer => {
  const parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)

  try {
    parser.feed(consumer)
  } catch (e) {
    return false
  }

  return parser.results.length > 0
}

module.exports = validateName
