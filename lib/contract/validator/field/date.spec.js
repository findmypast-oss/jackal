'use strict'

const tap = require('tap')
const test = tap.test

const validateField = require('.')
const ok = { valid: true, error: null }
const notOk = { valid: false, error: { name: 'ValidationError', message: 'Custom Error' } }

test('validateField - Joi.date()', t => {
  t.plan(1)

  t.same(validateField('Joi.date()'), ok)
})

test('validateField - Joi.date().min()', t => {
  t.plan(13)

  t.same(validateField(`Joi.date().min('now')`), ok)
  t.same(validateField('Joi.date().min(123456789)'), ok)
  t.same(validateField(`Joi.date().min('0000-01-01')`), ok)
  t.same(validateField(`Joi.date().min('9999-12-31')`), ok)
  t.same(validateField(`Joi.date().min('0000-01-01T00:00:00')`), ok)
  t.same(validateField(`Joi.date().min('9999-12-31T23:59:59')`), ok)

  t.same(validateField(`Joi.date().min('random')`, null, 'Custom Error'), notOk)
  t.same(validateField('Joi.date().min(1.23)', null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('ABCD-20-50')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('10000-13-42')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('9999/12/31')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('9999-12-31T33:69:79')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('0000-01-01 00:00:00')`, null, 'Custom Error'), notOk)
})

test('validateField - Joi.date().min().iso()', t => {
  t.plan(13)

  t.same(validateField(`Joi.date().min('now').iso()`), ok)
  t.same(validateField('Joi.date().min(123456789).iso()'), ok)
  t.same(validateField(`Joi.date().min('0000-01-01').iso()`), ok)
  t.same(validateField(`Joi.date().min('9999-12-31').iso()`), ok)
  t.same(validateField(`Joi.date().min('0000-01-01T00:00:00').iso()`), ok)
  t.same(validateField(`Joi.date().min('9999-12-31T23:59:59').iso()`), ok)

  t.same(validateField(`Joi.date().min('random').iso()`, null, 'Custom Error'), notOk)
  t.same(validateField('Joi.date().min(1.23).iso()', null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('ABCD-20-50').iso()`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('10000-13-42').iso()`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('9999/12/31').iso()`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('9999-12-31T33:69:79').iso()`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('0000-01-01 00:00:00').iso()`, null, 'Custom Error'), notOk)
})

test(`validateField - Joi.date().min().timestamp('javascript')`, t => {
  t.plan(13)

  t.same(validateField(`Joi.date().min('now').timestamp('javascript')`), ok)
  t.same(validateField(`Joi.date().min(123456789).timestamp('javascript')`), ok)
  t.same(validateField(`Joi.date().min('0000-01-01').timestamp('javascript')`), ok)
  t.same(validateField(`Joi.date().min('9999-12-31').timestamp('javascript')`), ok)
  t.same(validateField(`Joi.date().min('0000-01-01T00:00:00').timestamp('javascript')`), ok)
  t.same(validateField(`Joi.date().min('9999-12-31T23:59:59').timestamp('javascript')`), ok)

  t.same(validateField(`Joi.date().min('random').timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min(1.23).timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('ABCD-20-50').timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('10000-13-42').timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('9999/12/31').timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('9999-12-31T33:69:79').timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('0000-01-01 00:00:00').timestamp('javascript')`, null, 'Custom Error'), notOk)
})

test(`validateField - Joi.date().min().timestamp('unix')`, t => {
  t.plan(13)

  t.same(validateField(`Joi.date().min('now').timestamp('unix')`), ok)
  t.same(validateField(`Joi.date().min(123456789).timestamp('unix')`), ok)
  t.same(validateField(`Joi.date().min('0000-01-01').timestamp('unix')`), ok)
  t.same(validateField(`Joi.date().min('9999-12-31').timestamp('unix')`), ok)
  t.same(validateField(`Joi.date().min('0000-01-01T00:00:00').timestamp('unix')`), ok)
  t.same(validateField(`Joi.date().min('9999-12-31T23:59:59').timestamp('unix')`), ok)

  t.same(validateField(`Joi.date().min('random').timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min(1.23).timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('ABCD-20-50').timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('10000-13-42').timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('9999/12/31').timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('9999-12-31T33:69:79').timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('0000-01-01 00:00:00').timestamp('unix')`, null, 'Custom Error'), notOk)
})

test(`validateField - Joi.date().max()`, t => {
  t.plan(13)

  t.same(validateField(`Joi.date().max('now')`), ok)
  t.same(validateField('Joi.date().max(123456789)'), ok)
  t.same(validateField(`Joi.date().max('0000-01-01')`), ok)
  t.same(validateField(`Joi.date().max('9999-12-31')`), ok)
  t.same(validateField(`Joi.date().max('0000-01-01T00:00:00')`), ok)
  t.same(validateField(`Joi.date().max('9999-12-31T23:59:59')`), ok)

  t.same(validateField(`Joi.date().max('random')`, null, 'Custom Error'), notOk)
  t.same(validateField('Joi.date().max(1.23)', null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('ABCD-20-50')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('10000-13-42')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('9999/12/31')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('9999-12-31T33:69:79')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('0000-01-01 00:00:00')`, null, 'Custom Error'), notOk)
})

test('validateField - Joi.date().max().iso()', t => {
  t.plan(13)

  t.same(validateField(`Joi.date().max('now').iso()`), ok)
  t.same(validateField('Joi.date().max(123456789).iso()'), ok)
  t.same(validateField(`Joi.date().max('0000-01-01').iso()`), ok)
  t.same(validateField(`Joi.date().max('9999-12-31').iso()`), ok)
  t.same(validateField(`Joi.date().max('0000-01-01T00:00:00').iso()`), ok)
  t.same(validateField(`Joi.date().max('9999-12-31T23:59:59').iso()`), ok)

  t.same(validateField(`Joi.date().max('random').iso()`, null, 'Custom Error'), notOk)
  t.same(validateField('Joi.date().max(1.23).iso()', null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('ABCD-20-50').iso()`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('10000-13-42').iso()`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('9999/12/31').iso()`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('9999-12-31T33:69:79').iso()`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('0000-01-01 00:00:00').iso()`, null, 'Custom Error'), notOk)
})

test(`validateField - Joi.date().max().timestamp('javascript')`, t => {
  t.plan(13)

  t.same(validateField(`Joi.date().max('now').timestamp('javascript')`), ok)
  t.same(validateField(`Joi.date().max(123456789).timestamp('javascript')`), ok)
  t.same(validateField(`Joi.date().max('0000-01-01').timestamp('javascript')`), ok)
  t.same(validateField(`Joi.date().max('9999-12-31').timestamp('javascript')`), ok)
  t.same(validateField(`Joi.date().max('0000-01-01T00:00:00').timestamp('javascript')`), ok)
  t.same(validateField(`Joi.date().max('9999-12-31T23:59:59').timestamp('javascript')`), ok)

  t.same(validateField(`Joi.date().max('random').timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max(1.23).timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('ABCD-20-50').timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('10000-13-42').timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('9999/12/31').timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('9999-12-31T33:69:79').timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('0000-01-01 00:00:00').timestamp('javascript')`, null, 'Custom Error'), notOk)
})

test(`validateField - Joi.date().max().timestamp('unix')`, t => {
  t.plan(13)

  t.same(validateField(`Joi.date().max('now').timestamp('unix')`), ok)
  t.same(validateField(`Joi.date().max(123456789).timestamp('unix')`), ok)
  t.same(validateField(`Joi.date().max('0000-01-01').timestamp('unix')`), ok)
  t.same(validateField(`Joi.date().max('9999-12-31').timestamp('unix')`), ok)
  t.same(validateField(`Joi.date().max('0000-01-01T00:00:00').timestamp('unix')`), ok)
  t.same(validateField(`Joi.date().max('9999-12-31T23:59:59').timestamp('unix')`), ok)

  t.same(validateField(`Joi.date().max('random').timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max(1.23).timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('ABCD-20-50').timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('10000-13-42').timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('9999/12/31').timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('9999-12-31T33:69:79').timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().max('0000-01-01 00:00:00').timestamp('unix')`, null, 'Custom Error'), notOk)
})

test(`validateField - Joi.date().min().max()`, t => {
  t.plan(13)

  t.same(validateField(`Joi.date().min('now').max('now')`), ok)
  t.same(validateField('Joi.date().min(123456789).max(123456789)'), ok)
  t.same(validateField(`Joi.date().min('0000-01-01').max('0000-01-01')`), ok)
  t.same(validateField(`Joi.date().min('9999-12-31').max('9999-12-31')`), ok)
  t.same(validateField(`Joi.date().min('0000-01-01T00:00:00').max('0000-01-01T00:00:00')`), ok)
  t.same(validateField(`Joi.date().min('9999-12-31T23:59:59').max('9999-12-31T23:59:59')`), ok)

  t.same(validateField(`Joi.date().min('random').max('random')`, null, 'Custom Error'), notOk)
  t.same(validateField('Joi.date().min(1.23).max(1.23)', null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('ABCD-20-50').max('ABCD-20-50')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('10000-13-42').max('10000-13-42')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('9999/12/31').max('9999/12/31')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('9999-12-31T33:69:79').max('9999-12-31T33:69:79')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().min('0000-01-01 00:00:00').max('0000-01-01 00:00:00')`, null, 'Custom Error'), notOk)
})

test(`validateField - Joi.date().iso().timestamp('unix')`, t => {
  t.plan(7)

  t.same(validateField(`Joi.date().iso().timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().iso().timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().iso().timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().iso().timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().iso().timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().iso().timestamp('unix')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().iso().timestamp('unix')`, null, 'Custom Error'), notOk)
})

test(`validateField - Joi.date().iso().timestamp('javascript')`, t => {
  t.plan(7)

  t.same(validateField(`Joi.date().iso().timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().iso().timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().iso().timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().iso().timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().iso().timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().iso().timestamp('javascript')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.date().iso().timestamp('javascript')`, null, 'Custom Error'), notOk)
})
