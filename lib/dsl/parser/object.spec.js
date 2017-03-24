'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const parse = require('.')

test('parse - object with single key', t => {
  t.plan(1)

  const input = '{"key":"boolean"}'
  const expected = [ [ '{', [ null ], [ [ [ '"', [ [ 'k' ], [ 'e' ], [ 'y' ] ], '"' ], [ null ], ':', [ null ], [ [ '"', null, [ [ 'boolean' ] ], null, '"' ] ] ], [ ] ], [ null ], '}' ] ]
  t.same(parse(input), expected)
})

test('parse - object with multiple keys', t => {
  t.plan(1)

  const input = '{"key":"boolean","keyToo":"string"}'
  const expected = [ [ '{', [ null ], [ [ [ '"', [ [ 'k' ], [ 'e' ], [ 'y' ] ], '"' ], [ null ], ':', [ null ], [ [ '"', null, [ [ 'boolean' ] ], null, '"' ] ] ], [ [ ',', [ null ], [ [ '"', [ [ 'k' ], [ 'e' ], [ 'y' ], [ 'T' ], [ 'o' ], [ 'o' ] ], '"' ], [ null ], ':', [ null ], [ [ '"', null, [ [ 'string' ] ], null, '"' ] ] ] ] ] ], [ null ], '}' ] ]
  t.same(parse(input), expected)
})
