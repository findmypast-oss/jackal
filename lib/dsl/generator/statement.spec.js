'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const generate = require('.')

test('generate - boolean statement', t => {
  t.plan(6)

  const input = [ [ `'`, null, [ [ 'boolean' ] ], null, `'`] ]
  const schema = generate(input)

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

test('generate - date statement', t => {
  t.plan(19)

  const input = [ [ `'`, null, [ [ 'date' ] ], null, `'`] ]
  const schema = generate(input)

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

test('generate - date_iso statement', t => {
  t.plan(19)

  const input = [ [ `'`, null, [ [ 'date_iso' ] ], null, `'`] ]
  const schema = generate(input)

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

test('generate - integer statement', t => {
  t.plan(6)

  const input = [ [ `'`, null, [ [ 'integer' ] ], null, `'`] ]
  const schema = generate(input)

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

test('generate - real statement', t => {
  t.plan(6)

  const input = [ [ `'`, null, [ [ 'real' ] ], null, `'`] ]
  const schema = generate(input)

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

test('generate - string statement', t => {
  t.plan(4)

  const input = [ [ `'`, null, [ [ 'string' ] ], null, `'`] ]
  const schema = generate(input)

  let validation = Joi.validate(123, schema)
  t.ok(validation.error !== null)

  validation = Joi.validate('456', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(undefined, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(null, schema)
  t.ok(validation.error !== null)
})

test('generate - string_email statement', t => {
  t.plan(5)

  const input = [ [ `'`, null, [ [ 'string_email' ] ], null, `'`] ]
  const schema = generate(input)

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

test('generate - string_guid statement', t => {
  t.plan(5)

  const input = [ [ `'`, null, [ [ 'string_guid' ] ], null, `'`] ]
  const schema = generate(input)

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

test('generate - optional statement', t => {
  t.plan(4)

  const input = [ [ `'`, [ [ '?' ] ], [ [ 'real' ] ], null, `'`] ]
  const schema = generate(input)

  let validation = Joi.validate(1.23, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('4.56', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(undefined, schema)
  t.ok(validation.error === null)

  validation = Joi.validate(null, schema)
  t.ok(validation.error !== null)
})

test('generate - required statement', t => {
  t.plan(4)

  const input = [ [ `'`, [ [ '!' ] ], [ [ 'integer' ] ], null, `'`] ]
  const schema = generate(input)

  let validation = Joi.validate(123, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('456', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(undefined, schema)
  t.ok(validation.error !== null)

  validation = Joi.validate(null, schema)
  t.ok(validation.error !== null)
})

test('generate - statement with single allow clause', t => {
  t.plan(6)

  const input = [ [ `'`, null, [ [ 'boolean' ] ], [ [ '(', [ [ [ 'NULL' ] ], [ ] ], ')' ] ], `'`] ]
  const schema = generate(input)

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

test('generate - statement with multiple allow clauses', t => {
  t.plan(11)

  const input = [ [ `'`, null, [ [ 'boolean' ] ], [ [ '(', [ [ [ 'NULL' ] ], [ [ ',', [ null ], [ [ `'`, [ [ [ 's' ] ], [ [ 't' ] ], [ [ 'r' ] ], [ [ 'i' ] ], [ [ 'n' ] ], [ [ 'g' ] ] ], `'` ] ] ], [ ',', [ ' ' ], [ [ null, [ [ '1' ] ] ] ] ], [ ',', [ ' ' ], [ [ "-", [ [ '1' ] ] ] ] ], [ ",", [ null ], [ [ null, [ [ [ "2" ], ".", [ "3" ] ] ] ] ] ], [ ",", [ null ], [ [ "-", [ [ [ "2" ], ".", [ "3" ] ] ] ] ] ] ] ], ')' ] ], `'` ] ]
  const schema = generate(input)

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
