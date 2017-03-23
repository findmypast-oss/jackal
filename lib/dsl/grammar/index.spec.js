'use strict'

const tap = require('tap')
const test = tap.test

const nearley = require('nearley')
const grammar = require('.')

test('parser', t => {
  t.plan(0)

  const parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)
  parser.feed('["boolean"]')

  console.log('\n')
  console.log(parser.results.length)
  for (let i = 0; i < parser.results.length; i++) {
    console.log(parser.results[i])
    console.log('\n')
  }
  console.log('\n')
})
