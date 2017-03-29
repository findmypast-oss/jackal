'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const parseJoi = require('.')

test('parseJoi - object with single key', function (t) {
  t.plan(2)

  const input = 'Joi.object({"key":"Joi.boolean()"})'
  const schema = parseJoi(input)

  let validation = Joi.validate({ key: true }, schema)
  t.ok(validation.error === null)

  validation = Joi.validate({ key: 'string' }, schema)
  t.ok(validation.error !== null)
})

test('parseJoi - object with single key using keys function', function (t) {
  t.plan(2)

  const input = 'Joi.object().keys({"key":"Joi.boolean()"})'
  const schema = parseJoi(input)

  let validation = Joi.validate({ key: true }, schema)
  t.ok(validation.error === null)

  validation = Joi.validate({ key: 'string' }, schema)
  t.ok(validation.error !== null)
})

test('parseJoi - object with multiple keys', function (t) {
  t.plan(3)

  const input = 'Joi.object({"key":"Joi.boolean()","keyToo":"Joi.string()"})'
  const schema = parseJoi(input)

  let validation = Joi.validate({ key: true, keyToo: 'string' }, schema)
  t.ok(validation.error === null)

  validation = Joi.validate({ key: 'string', keyToo: 'string' }, schema)
  t.ok(validation.error !== null)

  validation = Joi.validate({ key: true, keyToo: true }, schema)
  t.ok(validation.error !== null)
})

test('parseJoi - object with multiple keys using keys function', function (t) {
  t.plan(3)

  const input = 'Joi.object().keys({"key":"Joi.boolean()","keyToo":"Joi.string()"})'
  const schema = parseJoi(input)

  let validation = Joi.validate({ key: true, keyToo: 'string' }, schema)
  t.ok(validation.error === null)

  validation = Joi.validate({ key: 'string', keyToo: 'string' }, schema)
  t.ok(validation.error !== null)

  validation = Joi.validate({ key: true, keyToo: true }, schema)
  t.ok(validation.error !== null)
})
