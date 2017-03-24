'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const parse = require('.')

test('parse - boolean statement', t => {
  t.plan(1)

  const input = '"boolean"'
  const expected = [ [ '"', null, [ [ 'boolean' ] ], null, '"'] ]
  t.same(parse(input), expected)
})

test('parse - date statement', t => {
  t.plan(1)

  const input = '"date"'
  const expected = [ [ '"', null, [ [ 'date' ] ], null, '"'] ]
  t.same(parse(input), expected)
})

test('parse - date_iso statement', t => {
  t.plan(1)

  const input = '"date_iso"'
  const expected = [ [ '"', null, [ [ 'date_iso' ] ], null, '"'] ]
  t.same(parse(input), expected)
})

test('parse - integer statement', t => {
  t.plan(1)

  const input = '"integer"'
  const expected = [ [ '"', null, [ [ 'integer' ] ], null, '"'] ]
  t.same(parse(input), expected)
})

test('parse - real statement', t => {
  t.plan(1)

  const input = '"real"'
  const expected = [ [ '"', null, [ [ 'real' ] ], null, '"'] ]
  t.same(parse(input), expected)
})

test('parse - string statement', t => {
  t.plan(1)

  const input = '"string"'
  const expected = [ [ '"', null, [ [ 'string' ] ], null, '"'] ]
  t.same(parse(input), expected)
})

test('parse - string_email statement', t => {
  t.plan(1)

  const input = '"string_email"'
  const expected = [ [ '"', null, [ [ 'string_email' ] ], null, '"'] ]
  t.same(parse(input), expected)
})

test('parse - string_guid statement', t => {
  t.plan(1)

  const input = '"string_guid"'
  const expected = [ [ '"', null, [ [ 'string_guid' ] ], null, '"'] ]
  t.same(parse(input), expected)
})

test('parse - optional statement', t => {
  t.plan(1)

  const input = '"?real"'
  const expected = [ [ '"', [ [ '?' ] ], [ [ 'real' ] ], null, '"'] ]
  t.same(parse(input), expected)
})

test('parse - required statement', t => {
  t.plan(1)

  const input = '"!integer"'
  const expected = [ [ '"', [ [ '!' ] ], [ [ 'integer' ] ], null, '"'] ]
  t.same(parse(input), expected)
})

test('parse - state with single allow clause', t => {
  t.plan(1)

  const input = '"boolean(NULL)"'
  const expected = [ [ '"', null, [ [ 'boolean' ] ], [ [ '(', [ [ [ 'NULL' ] ], [ ] ], ')' ] ], '"'] ]
  t.same(parse(input), expected)
})

test('parse - state with multiple allow clauses', t => {
  t.plan(1)

  const input = '"boolean(NULL,\'string\', 1,-1,2.3,-2.3)"'
  const expected = [ [ '"', null, [ [ 'boolean' ] ], [ [ '(', [ [ [ 'NULL' ] ], [ [ ',', [ null ], [ [ `'`, [ [ [ 's' ] ], [ [ 't' ] ], [ [ 'r' ] ], [ [ 'i' ] ], [ [ 'n' ] ], [ [ 'g' ] ] ], `'` ] ] ], [ ',', [ ' ' ], [ [ null, [ [ '1' ] ] ] ] ], [ ',', [ null ], [ [ [ "-" ], [ [ '1' ] ] ] ] ], [ ",", [ null ], [ [ null, [ [ [ "2" ], ".", [ "3" ] ] ] ] ] ], [ ",", [ null ], [ [ [ "-" ], [ [ [ "2" ], ".", [ "3" ] ] ] ] ] ] ] ], ')' ] ], '"' ] ]
  t.same(parse(input), expected)
})
