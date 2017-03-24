'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const parseResponse = require('.')

test('parseResponse - array with single type', t => {
  t.plan(3)

  const schema = parseResponse({ statusCode: 200, body: [ `'boolean'` ] }).response

  let webResponse = { statusCode: 200, body: [ true, false, true, true, false ] }
  let validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: [ 'string', false ] }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: [ 'string' ] }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)
})

test('parseResponse - array with multiple types', t => {
  t.plan(3)

  const schema = parseResponse({ statusCode: 200, body: [ `'boolean'`, `'integer'` ] }).response

  let webResponse = { statusCode: 200, body: [ true, false, 1, 2, 3 ] }
  let validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: [ 'string', false, 1, 2, 3 ] }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: [ 'string' ] }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)
})
