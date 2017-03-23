'use strict'

const nearley = require('nearley')
const grammar = require('./grammar')
const generate = require('./generator')

const compileField = field => {
  const parser = new nearley.Parser(grammar.ParserRules, grammar.parserStart)

  try {
    parser.feed(field)
  } catch (e) {
    /* eslint-disable no-console */
    console.error(e)
    /* eslint-enable no-console */
  }

  /* eslint-disable no-console */
  console.error(parser.results.length)
  /* eslint-enable no-console */

  return generate(parser.results)
}

module.exports = compileField
