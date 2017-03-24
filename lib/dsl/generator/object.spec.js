'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const generate = require('.')

test('generate - object with single key', t => {
  t.plan(4)

  const input = [ [ '{', [ null ], [ [ [ `'`, [ [ 'k' ], [ 'e' ], [ 'y' ] ], `'` ], [ null ], ':', [ null ], [ [ `'`, null, [ [ 'boolean' ] ], null, `'` ] ] ], [ ] ], [ null ], '}' ] ]
  const schema = generate(input)

  let validation = Joi.validate({ key: true }, schema)
  t.ok(validation.error === null)

  validation = Joi.validate({ key: true, unknown: true }, schema)
  t.ok(validation.error === null)

  validation = Joi.validate({ key: 'string', unknown: true }, schema)
  t.ok(validation.error !== null)

  validation = Joi.validate({ unknown: true }, schema)
  t.ok(validation.error === null)
})

test('generate - object with multiple keys', t => {
  t.plan(5)

  const input = [ [ '{', [ null ], [ [ [ `'`, [ [ [ 'k' ] ], [ [ 'e' ] ], [ [ 'y' ] ] ], `'` ], [ null ], ':', [ null ], [ [ `'`, null, [ [ 'boolean' ] ], null, `'` ] ] ], [ [ ',', [ null ], [ [ `'`, [ [ [ 'k' ] ], [ [ 'e' ] ], [ [ 'y' ] ], [ [ 'T' ] ], [ [ 'o' ] ], [ [ 'o' ] ] ], `'` ], [ null ], ':', [ null ], [ [ `'`, null, [ [ 'string' ] ], null, `'` ] ] ] ] ] ], [ null ], '}' ] ]
  const schema = generate(input)

  let validation = Joi.validate({ key: true, keyToo: 'string' }, schema)
  t.ok(validation.error === null)

  validation = Joi.validate({ key: true, keyToo: 'string', unknown: true }, schema)
  t.ok(validation.error === null)

  validation = Joi.validate({ key: 'string', keyToo: 'string', unknown: true }, schema)
  t.ok(validation.error !== null)

  validation = Joi.validate({ key: true, keyToo: true, unknown: true }, schema)
  t.ok(validation.error !== null)

  validation = Joi.validate({ unknown: true }, schema)
  t.ok(validation.error === null)
})
