'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const generate = require('.')

test('generate - object with single key', t => {
  t.plan(4)

  let input = [ '{', [ null ], [ [ [ '"', [ 'k', 'e', 'y' ], '"' ], [ null ], ':', [ null ], [ '"', null, [ [ 'boolean' ] ], null, '"'] ], [ ] ], [ null ], '}' ]
  let schema = generate(input)

  let validation = Joi.validate({ key: true }, schema)
  t.ok(validation.error === null)

  validation = Joi.validate({ key: true, unknown: true }, schema)
  t.ok(validation.error === null)

  validation = Joi.validate({ key: 'string', unknown: true }, schema)
  t.ok(validation.error !== null)

  validation = Joi.validate({ unknown: true }, schema)
  t.ok(validation.error === null)
})
