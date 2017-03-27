'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const parseJoi = require('.')

test('parseJoi - boolean statement', t => {
  t.plan(6)

  const input = 'Joi.boolean()'
  const schema = parseJoi(input)

  let validation = Joi.validate(true, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('true', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(false, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('false', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(undefined, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(null, schema)
  t.ok(validation.error !== null)
})

test('parseJoi - date statement', t => {
  t.plan(19)

  const input = 'Joi.date()'
  const schema = parseJoi(input)

  let validation = Joi.validate(123, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('456', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('Aug 9, 1995', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('Wed, 09 Aug 1995 00:00:00 GMT', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('Wed, 09 Aug 1995 00:00:00', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('Thu, 01 Jan 1970 00:00:00 GMT', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('Thu, 01 Jan 1970 00:00:00', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('Thu, 01 Jan 1970 00:00:00 GMT-0400', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('2017-01-01', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('2017-01-01T00:00:00', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('2017-01-01T00:00:00Z', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('2017-01-01T00:00:00.000', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('2017-01-01T00:00:00+01:00', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('2017-01-01T00:00:00-01:00', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('2017-01-01T00:00:00.000Z', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('2017-01-01T00:00:00.000+01:00', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('2017-01-01T00:00:00.000-01:00', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(undefined, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(null, schema)
  t.ok(validation.error !== null)
})

test('parseJoi - date_iso statement', t => {
  t.plan(19)

  const input = 'Joi.date().iso()'
  const schema = parseJoi(input)

  let validation = Joi.validate(123, schema)
  t.ok(validation.error !== null)

  validation = Joi.validate('456', schema)
  t.ok(validation.error !== null)

  validation = Joi.validate('Aug 9, 1995', schema)
  t.ok(validation.error !== null)

  validation = Joi.validate('Wed, 09 Aug 1995 00:00:00 GMT', schema)
  t.ok(validation.error !== null)

  validation = Joi.validate('Wed, 09 Aug 1995 00:00:00', schema)
  t.ok(validation.error !== null)

  validation = Joi.validate('Thu, 01 Jan 1970 00:00:00 GMT', schema)
  t.ok(validation.error !== null)

  validation = Joi.validate('Thu, 01 Jan 1970 00:00:00', schema)
  t.ok(validation.error !== null)

  validation = Joi.validate('Thu, 01 Jan 1970 00:00:00 GMT-0400', schema)
  t.ok(validation.error !== null)

  validation = Joi.validate('2017-01-01', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('2017-01-01T00:00:00', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('2017-01-01T00:00:00Z', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('2017-01-01T00:00:00.000', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('2017-01-01T00:00:00+01:00', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('2017-01-01T00:00:00-01:00', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('2017-01-01T00:00:00.000Z', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('2017-01-01T00:00:00.000+01:00', schema)
  t.ok(validation.error === null)

  validation = Joi.validate('2017-01-01T00:00:00.000-01:00', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(undefined, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(null, schema)
  t.ok(validation.error !== null)
})

test('parseJoi - integer statement', t => {
  t.plan(6)

  const input = 'Joi.number().integer()'
  const schema = parseJoi(input)

  let validation = Joi.validate(123, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('456', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(1.23, schema)
  t.ok(validation.error !== null)

  validation = Joi.validate('4.56', schema)
  t.ok(validation.error !== null)

  validation = Joi.validate(undefined, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(null, schema)
  t.ok(validation.error !== null)
})

test('parseJoi - number statement', t => {
  t.plan(6)

  const input = 'Joi.number()'
  const schema = parseJoi(input)

  let validation = Joi.validate(123, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('456', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(1.23, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('4.56', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(undefined, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(null, schema)
  t.ok(validation.error !== null)
})

test('parseJoi - string statement', t => {
  t.plan(4)

  const input = 'Joi.string()'
  const schema = parseJoi(input)

  let validation = Joi.validate(123, schema)
  t.ok(validation.error !== null)

  validation = Joi.validate('456', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(undefined, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(null, schema)
  t.ok(validation.error !== null)
})

test('parseJoi - string_email statement', t => {
  t.plan(5)

  const input = 'Joi.string().email()'
  const schema = parseJoi(input)

  let validation = Joi.validate(123, schema)
  t.ok(validation.error !== null)

  validation = Joi.validate('456', schema)
  t.ok(validation.error !== null)

  validation = Joi.validate('test@domain.com', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(undefined, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(null, schema)
  t.ok(validation.error !== null)
})

test('parseJoi - string_guid statement', t => {
  t.plan(5)

  const input = 'Joi.string().guid()'
  const schema = parseJoi(input)

  let validation = Joi.validate(123, schema)
  t.ok(validation.error !== null)

  validation = Joi.validate('456', schema)
  t.ok(validation.error !== null)

  validation = Joi.validate('123e4567-e89b-12d3-a456-426655440000', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(undefined, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(null, schema)
  t.ok(validation.error !== null)
})

test('parseJoi - optional statement', t => {
  t.plan(4)

  const input = 'Joi.number().optional()'
  const schema = parseJoi(input)

  let validation = Joi.validate(1.23, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('4.56', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(undefined, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(null, schema)
  t.ok(validation.error !== null)
})

test('parseJoi - required statement', t => {
  t.plan(4)

  const input = 'Joi.number().integer().required()'
  const schema = parseJoi(input)

  let validation = Joi.validate(123, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('456', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(undefined, schema)
  t.ok(validation.error !== null)

  validation = Joi.validate(null, schema)
  t.ok(validation.error !== null)
})

test('parseJoi - statement with single allow clause', t => {
  t.plan(6)

  const input = 'Joi.boolean().allow(null)'
  const schema = parseJoi(input)

  let validation = Joi.validate(true, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('true', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(false, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('false', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(undefined, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(null, schema)
  t.ok(validation.error === null)
})

test('parseJoi - statement with multiple allow clauses', t => {
  t.plan(11)

  const input = 'Joi.boolean().allow(null).allow("string").allow(1).allow(-1).allow(2.3).allow(-2.3)'
  const schema = parseJoi(input)

  let validation = Joi.validate(true, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('true', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(false, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('false', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(undefined, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(null, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('string', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(1, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(-1, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(2.3, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(-2.3, schema)
  t.ok(validation.error === null)
})

test('parseJoi - statement with allow clause with multiple values', t => {
  t.plan(11)

  const input = `Joi.boolean().allow([null,'string',1,-1,2.3,-2.3])`
  const schema = parseJoi(input)

  let validation = Joi.validate(true, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('true', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(false, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('false', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(undefined, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(null, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('string', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(1, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(-1, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(2.3, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(-2.3, schema)
  t.ok(validation.error === null)
})
