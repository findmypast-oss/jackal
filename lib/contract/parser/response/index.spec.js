'use strict'

const Joi = require('joi')
const tap = require('tap')
const test = tap.test

const parseResponse = require('.')

test('parseResponse', t => {
  t.plan(13)

  const statusCodeOnly = { statusCode: 200 }
  t.ok(Joi.validate(statusCodeOnly, statusCodeOnly).error === null)

  const statusCodeStringBody = { statusCode: 200, body: 'hello, world!' }
  t.ok(Joi.validate(statusCodeStringBody, statusCodeStringBody).error === null)

  const statusCodeJoiBodyInput = { statusCode: 200, body: 'Joi.string()' }
  const statusCodeJoiBodyResponse = { statusCode: 200, body: 'hello, world!' }
  t.ok(Joi.validate(statusCodeJoiBodyResponse, parseResponse(statusCodeJoiBodyInput)).error === null)

  const statusCodeObjectBodyInput = { statusCode: 200, body: { key: 'Joi.string()' } }
  const statusCodeObjectBodyResponse = { statusCode: 200, body: { key: 'hello, world!' } }
  t.ok(Joi.validate(statusCodeObjectBodyResponse, parseResponse(statusCodeObjectBodyInput)).error === null)

  const statusCodeInnerObjectBodyInput = { statusCode: 200, body: { innerObject: { innerObjectKey: 'Joi.number().integer()' }, outerKey: 'Joi.string()' } }
  const statusCodeInnerObjectBodyResponse = { statusCode: 200, body: { innerObject: { innerObjectKey: 1 }, outerKey: 'key' } }
  t.ok(Joi.validate(statusCodeInnerObjectBodyResponse, parseResponse(statusCodeInnerObjectBodyInput)).error === null)

  const statusCodeStringBodyHeaders = { statusCode: 200, body: 'hello, world!', headers: { 'Content-Type': 'application/json' } }
  t.ok(Joi.validate(statusCodeStringBodyHeaders, parseResponse(statusCodeStringBodyHeaders)).error === null)

  const statusCodeJoiBodyHeadersInput = { statusCode: 200, body: 'Joi.number().integer()', headers: { 'Content-Type': 'application/json' } }
  const statusCodeJoiBodyHeadersResponse = { statusCode: 200, body: 123, headers: { 'Content-Type': 'application/json' } }
  t.ok(Joi.validate(statusCodeJoiBodyHeadersResponse, parseResponse(statusCodeJoiBodyHeadersInput)).error === null)

  const statusCodeObjectBodyHeadersInput = { statusCode: 200, body: { key: 'Joi.string()' }, headers: { 'Content-Type': 'application/json' } }
  const statusCodeObjectBodyHeadersResponse = { statusCode: 200, body: { key: 'hello, world!' }, headers: { 'Content-Type': 'application/json' } }
  t.ok(Joi.validate(statusCodeObjectBodyHeadersResponse, parseResponse(statusCodeObjectBodyHeadersInput)).error === null)

  const statusCodeInnerObjectBodyHeadersInput = { statusCode: 200, body: { innerObject: { innerObjectKey: 'Joi.number().integer()' }, outerKey: 'Joi.string()' }, headers: { 'Content-Type': 'application/json' } }
  const statusCodeInnerObjectBodyHeadersResponse = { statusCode: 200, body: { innerObject: { innerObjectKey: 1 }, outerKey: 'key' }, headers: { 'Content-Type': 'application/json' } }
  t.ok(Joi.validate(statusCodeInnerObjectBodyHeadersResponse, parseResponse(statusCodeInnerObjectBodyHeadersInput)).error === null)

  const statusCodeStringBodyJoiHeaders = { statusCode: 200, body: 'hello, world!', headers: { 'Content-Type': 'Joi.string()' } }
  t.ok(Joi.validate(statusCodeStringBodyHeaders, parseResponse(statusCodeStringBodyHeaders)).error === null)

  const statusCodeJoiBodyJoiHeadersInput = { statusCode: 200, body: 'Joi.number().integer()', headers: { 'Content-Type': 'Joi.string()' } }
  const statusCodeJoiBodyJoiHeadersResponse = { statusCode: 200, body: 123, headers: { 'Content-Type': 'application/json' } }
  t.ok(Joi.validate(statusCodeJoiBodyHeadersResponse, parseResponse(statusCodeJoiBodyHeadersInput)).error === null)

  const statusCodeObjectBodyJoiHeadersInput = { statusCode: 200, body: { key: 'Joi.string()' }, headers: { 'Content-Type': 'Joi.string()' } }
  const statusCodeObjectBodyJoiHeadersResponse = { statusCode: 200, body: { key: 'hello, world!' }, headers: { 'Content-Type': 'application/json' } }
  t.ok(Joi.validate(statusCodeObjectBodyHeadersResponse, parseResponse(statusCodeObjectBodyHeadersInput)).error === null)

  const statusCodeInnerObjectBodyJoiHeadersInput = { statusCode: 200, body: { innerObject: { innerObjectKey: 'Joi.number().integer()' }, outerKey: 'Joi.string()' }, headers: { 'Content-Type': 'Joi.string()' } }
  const statusCodeInnerObjectBodyJoiHeadersResponse = { statusCode: 200, body: { innerObject: { innerObjectKey: 1 }, outerKey: 'key' }, headers: { 'Content-Type': 'application/json' } }
  t.ok(Joi.validate(statusCodeInnerObjectBodyHeadersResponse, parseResponse(statusCodeInnerObjectBodyHeadersInput)).error === null)
})
