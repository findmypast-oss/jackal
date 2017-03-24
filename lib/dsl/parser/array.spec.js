'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const parse = require('.')

test('parse - array with single type', t => {
  t.plan(1)

  const input = '["boolean"]'
  const expected = [ [ '[', [ null ], [ [ [ '"', null, [ [ 'boolean' ] ], null, '"' ] ], [ ] ], [ null ], ']' ] ]
  t.same(parse(input), expected)
})

test('parse - array with multiple types', t => {
  t.plan(1)

  const input = '["boolean","integer"]'
  const expected = [ [ '[', [ null ], [ [ [ '"', null, [ [ 'boolean' ] ], null, '"' ] ], [ [ ',', [ null ], [ [ '"', null, [ [ 'integer' ] ], null, '"' ] ] ] ] ], [ null ], ']' ] ]
  t.same(parse(input), expected)
})
