'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const compileField = require('.')

test('compileField - array with single type', t => {
  t.plan(3)

  const input = `['boolean']`
  const schema = compileField(input)

  let validation = Joi.validate([ true, false, true, true, false ], schema)
  t.ok(validation.error === null)

  validation = Joi.validate([ 'string', true, false ], schema)
  t.ok(validation.error !== null)

  validation = Joi.validate([ 'string' ], schema)
  t.ok(validation.error !== null)
})

test('compileField - array with multiple types', t => {
  t.plan(3)

  const input = `['boolean','integer']`
  const schema = compileField(input)

  let validation = Joi.validate([ true, false, 1, 2, 3 ], schema)
  t.ok(validation.error === null)

  validation = Joi.validate([ 'string', true, false, 1, 2, 3 ], schema)
  t.ok(validation.error !== null)

  validation = Joi.validate([ 'string' ], schema)
  t.ok(validation.error !== null)
})
