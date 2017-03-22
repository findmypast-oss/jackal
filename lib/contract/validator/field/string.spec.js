'use strict'

const tap = require('tap')
const test = tap.test

const validateField = require('.')
const ok = { valid: true, error: null }
const notOk = { valid: false, error: { name: 'ValidationError', message: 'Custom Error' } }

test('validateField - Joi.string()', t => {
  t.plan(1)

  t.same(validateField('Joi.string()'), ok)
})

test('validateField - Joi.string().insensitive()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().insensitive()'), ok)
})

test('validateField - Joi.string().min()', t => {
  t.plan(5)

  t.same(validateField('Joi.string().min(1)'), ok)
  t.same(validateField(`Joi.string().min(1, 'utf8')`), ok)

  t.same(validateField('Joi.string().min(1.2)', null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.string().min('1')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.string().min(1, 'fake')`, null, 'Custom Error'), notOk)
})

test('validateField - Joi.string().max()', t => {
  t.plan(5)

  t.same(validateField('Joi.string().max(1)'), ok)
  t.same(validateField(`Joi.string().max(1, 'utf8')`), ok)

  t.same(validateField('Joi.string().max(1.2)', null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.string().max('1')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.string().max(1, 'fake')`, null, 'Custom Error'), notOk)
})

test('validateField - Joi.string().max().truncate()', t => {
  t.plan(10)

  t.same(validateField('Joi.string().max(1).truncate()'), ok)
  t.same(validateField('Joi.string().max(1).truncate(true)'), ok)
  t.same(validateField('Joi.string().max(1).truncate(false)'), ok)
  t.same(validateField(`Joi.string().max(1).truncate('random')`, null, 'Custom Error'), notOk)

  t.same(validateField('Joi.string().max(1.2).truncate()', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.string().max(1.2).truncate(true)', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.string().max(1.2).truncate(false)', null, 'Custom Error'), notOk)

  t.same(validateField(`Joi.string().max('1').truncate()`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.string().max('1').truncate(true)`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.string().max('1').truncate(false)`, null, 'Custom Error'), notOk)
})

test('validateField - Joi.string().min().max().truncate()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().min(1).max(1).truncate()'), ok)
})

test('validateField - Joi.string().length()', t => {
  t.plan(2)

  t.same(validateField('Joi.string().length(1)'), ok)
  t.same(validateField(`Joi.string().length(1, 'utf8')`), ok)
})

test('validateField - Joi.string().min().length()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().min(1).length(1)', null, 'Custom Error'), notOk)
})

test('validateField - Joi.string().max().length()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().max(1).length(1)', null, 'Custom Error'), notOk)
})

test('validateField - Joi.string().max().truncate().length()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().max(1).truncate(1).length(1)', null, 'Custom Error'), notOk)
})

test('validateField - Joi.string().min().max().length()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().min(1).max(1).length(1)', null, 'Custom Error'), notOk)
})

test('validateField - Joi.string().min().max().truncate().length()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().min(1).max(1).truncate(1).length(1)', null, 'Custom Error'), notOk)
})

test('validateField - Joi.string().creditCard()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().creditCard()'), ok)
})

test('validateField - Joi.string().alphanum()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().alphanum()'), ok)
})

test('validateField - Joi.string().token()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().token()'), ok)
})

test('validateField - Joi.string().email()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().email()'), ok)
})

test('validateField - Joi.string().ip()', t => {
  t.plan(11)

  t.same(validateField('Joi.string().ip()'), ok)

  t.same(validateField(`Joi.string().ip({ version: [ 'ipv4' ] })`), ok)
  t.same(validateField(`Joi.string().ip({ version: [ 'ipv6' ] })`), ok)
  t.same(validateField(`Joi.string().ip({ version: [ 'ipvfuture' ] })`), ok)
  t.same(validateField(`Joi.string().ip({ version: [ 'ipv4', 'ipv6', 'ipvfuture' ] })`), ok)

  t.same(validateField(`Joi.string().ip({ cidr: 'optional' })`), ok)
  t.same(validateField(`Joi.string().ip({ cidr: 'required' })`), ok)
  t.same(validateField(`Joi.string().ip({ cidr: 'forbidden' })`), ok)

  t.same(validateField(`Joi.string().ip({ version: [ 'ipv4', 'ipv6', 'ipvfuture' ], cidr: 'optional' })`), ok)
  t.same(validateField(`Joi.string().ip({ version: [ 'ipv4', 'ipv6', 'ipvfuture' ], cidr: 'required' })`), ok)
  t.same(validateField(`Joi.string().ip({ version: [ 'ipv4', 'ipv6', 'ipvfuture' ], cidr: 'forbidden' })`), ok)
})

test('validateField - Joi.string().uri()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().uri()'), ok)
})

test('validateField - Joi.string().guid()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().guid()'), ok)
})

test('validateField - Joi.string().hex()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().hex()'), ok)
})

test('validateField - Joi.string().base64()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().base64()'), ok)
})

test('validateField - Joi.string().hostname()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().hostname()'), ok)
})

test('validateField - Joi.string().lowercase()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().lowercase()'), ok)
})

test('validateField - Joi.string().uppercase()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().uppercase()'), ok)
})

test('validateField - Joi.string().isoDate()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().isoDate()'), ok)
})

test('validateField - Joi.string().trim()', t => {
  t.plan(1)

  t.same(validateField('Joi.string().trim()'), ok)
})
