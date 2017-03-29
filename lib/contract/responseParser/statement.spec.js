'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const parseResponse = require('.')

test('parseResponse - boolean statement', function (t) {
  t.plan(6)

  const schema = parseResponse({ statusCode: 200, body: 'Joi.boolean()' }).response

  let webResponse = { statusCode: 200, body: true }
  let validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: false }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 'string' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: null }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: undefined }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)
})

test('parseResponse - date statement', function (t) {
  t.plan(20)

  const schema = parseResponse({ statusCode: 200, body: 'Joi.date()' }).response

  let webResponse = { statusCode: 200, body: 123 }
  let validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '456' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 'Aug 9, 1995' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 'Wed, 09 Aug 1995 00:00:00 GMT' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 'Wed, 09 Aug 1995 00:00:00' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 'Thu, 01 Jan 1970 00:00:00 GMT' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 'Thu, 01 Jan 1970 00:00:00' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 'Thu, 01 Jan 1970 00:00:00 GMT-0400' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '2017-01-01' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '2017-01-01T00:00:00' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '2017-01-01T00:00:00Z' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '2017-01-01T00:00:00.000' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '2017-01-01T00:00:00+01:00' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '2017-01-01T00:00:00-01:00' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '2017-01-01T00:00:00.000Z' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '2017-01-01T00:00:00.000+01:00' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '2017-01-01T00:00:00.000-01:00' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: undefined }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: null }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)
})

test('parseResponse - date_iso statement', function (t) {
  t.plan(20)

  const schema = parseResponse({ statusCode: 200, body: 'Joi.date().iso()' }).response

  let webResponse = { statusCode: 200, body: 123 }
  let validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: '456' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: 'Aug 9, 1995' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: 'Wed, 09 Aug 1995 00:00:00 GMT' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: 'Wed, 09 Aug 1995 00:00:00' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: 'Thu, 01 Jan 1970 00:00:00 GMT' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: 'Thu, 01 Jan 1970 00:00:00' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: 'Thu, 01 Jan 1970 00:00:00 GMT-0400' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: '2017-01-01' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '2017-01-01T00:00:00' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '2017-01-01T00:00:00Z' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '2017-01-01T00:00:00.000' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '2017-01-01T00:00:00+01:00' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '2017-01-01T00:00:00-01:00' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '2017-01-01T00:00:00.000Z' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '2017-01-01T00:00:00.000+01:00' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '2017-01-01T00:00:00.000-01:00' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: undefined }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: null }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)
})

test('parseResponse - integer statement', function (t) {
  t.plan(7)

  const schema = parseResponse({ statusCode: 200, body: 'Joi.number().integer()' }).response

  let webResponse = { statusCode: 200, body: 123 }
  let validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '456' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 1.23 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: '4.56' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: undefined }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: null }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)
})

test('parseResponse - number statement', function (t) {
  t.plan(7)

  const schema = parseResponse({ statusCode: 200, body: 'Joi.number()' }).response

  let webResponse = { statusCode: 200, body: 123 }
  let validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '456' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 1.23 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '4.56' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: undefined }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: null }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)
})

test('parseResponse - string statement', function (t) {
  t.plan(5)

  const schema = parseResponse({ statusCode: 200, body: 'Joi.string()' }).response

  let webResponse = { statusCode: 200, body: 123 }
  let validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: '456' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: undefined }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: null }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)
})

test('parseResponse - string_email statement', function (t) {
  t.plan(6)

  const schema = parseResponse({ statusCode: 200, body: 'Joi.string().email()' }).response

  let webResponse = { statusCode: 200, body: 123 }
  let validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: '456' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: 'test@domain.com' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: undefined }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: null }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)
})

test('parseResponse - string_guid statement', function (t) {
  t.plan(6)

  const schema = parseResponse({ statusCode: 200, body: 'Joi.string().guid()' }).response

  let webResponse = { statusCode: 200, body: 123 }
  let validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: '456' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: '123e4567-e89b-12d3-a456-426655440000' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: undefined }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: null }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)
})

test('parseResponse - optional statement', function (t) {
  t.plan(7)

  const schema = parseResponse({ statusCode: 200, body: 'Joi.number().optional()' }).response

  let webResponse = { statusCode: 200, body: 123 }
  let validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '456' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 1.23 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '4.56' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: undefined }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: null }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)
})

test('parseResponse - required statement', function (t) {
  t.plan(7)

  const schema = parseResponse({ statusCode: 200, body: 'Joi.number().integer().required()' }).response

  let webResponse = { statusCode: 200, body: 123 }
  let validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: '456' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 1.23 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: '4.56' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: undefined }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: null }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)
})

test('parseResponse - statement with single allow', function (t) {
  t.plan(6)

  const schema = parseResponse({ statusCode: 200, body: 'Joi.boolean().allow(null)' }).response

  let webResponse = { statusCode: 200, body: true }
  let validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: false }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 'string' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: null }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: undefined }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)
})

test('parseResponse - statement with multiple allows in multiple calls', function (t) {
  t.plan(10)

  const schema = parseResponse({ statusCode: 200, body: 'Joi.boolean().allow(null).allow("string").allow(1).allow(-1).allow(2.3).allow(-2.3)' }).response

  let webResponse = { statusCode: 200, body: true }
  let validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: false }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: null }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 'string' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 1 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: -1 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 2.3 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: -2.3 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: undefined }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)
})

test('parseResponse - statement with multiple allows in a single array', function (t) {
  t.plan(10)

  const schema = parseResponse({ statusCode: 200, body: 'Joi.boolean().allow([null,"string",1,-1,2.3,-2.3])' }).response

  let webResponse = { statusCode: 200, body: true }
  let validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: false }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: null }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 'string' }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 1 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: -1 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: 2.3 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: -2.3 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: undefined }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200 }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)
})
