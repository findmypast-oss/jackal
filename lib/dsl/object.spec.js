'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const compileField = require('.')

test('compileField - object with single key', t => {
  t.plan(4)

  const input = `{'key':'boolean'}`
  const schema = compileField(input)

  let validation = Joi.validate({ key: true }, schema)
  t.ok(validation.error === null)

  validation = Joi.validate({ key: true, unknown: true }, schema)
  t.ok(validation.error === null)

  validation = Joi.validate({ key: 'string', unknown: true }, schema)
  t.ok(validation.error !== null)

  validation = Joi.validate({ unknown: true }, schema)
  t.ok(validation.error === null)
})

test('compileField - object with multiple keys', t => {
  t.plan(5)

  const input = `{'key':'boolean','keyToo':'string'}`
  const schema = compileField(input)

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
