'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const parseJoi = require('.')

test('parseJoi - array with single type', function (t) {
  t.plan(3)

  const input = 'Joi.array().items([Joi.boolean()])'
  const schema = parseJoi(input)

  let validation = Joi.validate([ true, false, true, true, false ], schema)
  t.ok(validation.error === null)

  validation = Joi.validate([ 'string', true, false ], schema)
  t.ok(validation.error !== null)

  validation = Joi.validate([ 'string' ], schema)
  t.ok(validation.error !== null)
})

test('parseJoi - array with multiple types', function (t) {
  t.plan(3)

  const input = 'Joi.array().items([Joi.boolean(),Joi.number().integer()])'
  const schema = parseJoi(input)

  let validation = Joi.validate([ true, false, 1, 2, 3 ], schema)
  t.ok(validation.error === null)

  validation = Joi.validate([ 'string', true, false, 1, 2, 3 ], schema)
  t.ok(validation.error !== null)

  validation = Joi.validate([ 'string' ], schema)
  t.ok(validation.error !== null)
})
