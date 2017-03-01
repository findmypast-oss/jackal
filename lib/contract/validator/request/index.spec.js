'use strict'

const tap = require('tap')
const test = tap.test

const validateRequest = require('.')

test('validateRequest', t => {
  t.plan(8)

  const request = {}
  let expected = { valid: false, error: { name: 'ValidationError', message: '\t"url" is required' } }
  t.same(validateRequest(request), expected)

  request.url = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '\t"url" must be a string' } }
  t.same(validateRequest(request), expected)

  request.url = 'string'
  expected = { valid: false, error: { name: 'ValidationError', message: '\t"url" must be a valid uri' } }
  t.same(validateRequest(request), expected)

  request.url = 'http://www.findmypast.co.uk'
  request.method = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '\t"method" must be a string' } }
  t.same(validateRequest(request), expected)

  request.method = 'string'
  expected = { valid: false, error: { name: 'ValidationError', message: '\t"method" must be one of [CONNECT, DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE]' } }
  t.same(validateRequest(request), expected)

  request.method = 'GET'
  request.headers = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '\t"headers" must be an object' } }
  t.same(validateRequest(request), expected)

  request.headers = {}
  request.body = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '\t"body" must be a string' } }
  t.same(validateRequest(request), expected)

  request.body = 'body'
  expected = { valid: true, error: null }
  t.same(validateRequest(request), expected)
})
