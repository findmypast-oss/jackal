'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const parseResponse = require('.')

test('parseResponse - object with single key', t => {
  t.plan(4)

  const schema = parseResponse({ statusCode: 200, body: { key: 'Joi.boolean()' } }).response

  let webResponse = { statusCode: 200, body: { key: true } }
  let validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: { key: true, keyToo: 'string' } }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: { unknown: 'string' } }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: { key: 'string' } }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)
})

test('parseResponse - object with multiple keys', t => {
  t.plan(6)

  const schema = parseResponse({ statusCode: 200, body: { key: 'Joi.boolean()', keyToo: 'Joi.string()' } }).response

  let webResponse = { statusCode: 200, body: { key: true, keyToo: 'random' } }
  let validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: { key: true } }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: { keyToo: 'random' } }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)

  webResponse = { statusCode: 200, body: { key: 'random', keyToo: 'randomToo' } }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: { key: 'random', keyToo: true } }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error !== null)

  webResponse = { statusCode: 200, body: { unknown: 123 } }
  validation = Joi.validate(webResponse, schema)
  t.ok(validation.error === null)
})
