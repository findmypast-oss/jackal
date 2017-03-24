'use strict'

const nearley = require('nearley')
const grammar = require('../grammar')

const parse = string => {
  const parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)

  try {
    parser.feed(string)
  } catch (e) {
    return []
  }

  return parser.results[0]
}

module.exports = parse
