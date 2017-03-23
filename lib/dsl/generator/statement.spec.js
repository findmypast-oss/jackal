'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const generate = require('.')

test('generate - boolean statement', t => {
  t.plan(6)

  let input = [ [ '"', null, [ [ 'boolean' ] ], null, '"'] ]
  let schema = generate(input)

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

  let input = [ [ '"', null, [ [ 'date' ] ], null, '"'] ]
  let schema = generate(input)

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

  let input = [ [ '"', null, [ [ 'date_iso' ] ], null, '"'] ]
  let schema = generate(input)

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

  let input = [ [ '"', null, [ [ 'integer' ] ], null, '"'] ]
  let schema = generate(input)

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

  let input = [ [ '"', null, [ [ 'real' ] ], null, '"'] ]
  let schema = generate(input)

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

  let input = [ [ '"', null, [ [ 'string' ] ], null, '"'] ]
  let schema = generate(input)

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

  let input = [ [ '"', null, [ [ 'string_email' ] ], null, '"'] ]
  let schema = generate(input)

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

  let input = [ [ '"', null, [ [ 'string_guid' ] ], null, '"'] ]
  let schema = generate(input)

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

  let input = [ [ '"', [ [ '?' ] ], [ [ 'real' ] ], null, '"'] ]
  let schema = generate(input)

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

  let input = [ [ '"', [ [ '!' ] ], [ [ 'integer' ] ], null, '"'] ]
  let schema = generate(input)

  let validation = Joi.validate(123, schema)
  t.ok(validation.error === null)

  validation = Joi.validate('456', schema)
  t.ok(validation.error === null)

  validation = Joi.validate(undefined, schema)
  t.ok(validation.error !== null)

  validation = Joi.validate(null, schema)
  t.ok(validation.error !== null)
})

test('generate - state with single allow clause', t => {
  t.plan(6)

  let input = [ [ '"', null, [ [ 'boolean' ] ], [ [ '(', [ [ [ 'NULL' ] ], [ ] ], ')' ] ], '"'] ]
  let schema = generate(input)

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

test('generate - state with multiple allow clauses', t => {
  t.plan(8)

  let input = [ [ '"', null, [ [ 'boolean' ] ], [ [ '(', [ [ [ 'NULL' ] ], [ [ ',', null, 'string' ], [ ',', ' ', 1 ] ] ], ')' ] ], '"'] ]
  let schema = generate(input)

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
})
