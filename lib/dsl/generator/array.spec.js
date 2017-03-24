'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const generate = require('.')

test('generate - array with single type', t => {
  t.plan(3)

  const input = [ [ '[', [ null ], [ [ [ `'`, null, [ [ 'boolean' ] ], null, `'` ] ], [ ] ], [ null ], ']' ] ]
  const schema = generate(input)

  let validation = Joi.validate([ true, false, true, true, false ], schema)
  t.ok(validation.error === null)

  validation = Joi.validate([ 'string', true, false ], schema)
  t.ok(validation.error !== null)

  validation = Joi.validate([ 'string' ], schema)
  t.ok(validation.error !== null)
})

test('generate - array with multiple types', t => {
  t.plan(3)

  const input = [ [ '[', [ null ], [ [ [ `'`, null, [ [ 'boolean' ] ], null, `'` ] ], [ [ ',', [ null ], [ [ `'`, null, [ [ 'integer' ] ], null, `'` ] ] ] ] ], [ null ], ']' ] ]
  const schema = generate(input)

  let validation = Joi.validate([ true, false, 1, 2, 3 ], schema)
  t.ok(validation.error === null)

  validation = Joi.validate([ 'string', true, false, 1, 2, 3 ], schema)
  t.ok(validation.error !== null)

  validation = Joi.validate([ 'string' ], schema)
  t.ok(validation.error !== null)
})
