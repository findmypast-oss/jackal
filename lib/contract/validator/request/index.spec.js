'use strict'

const tap = require('tap')
const test = tap.test

const validateRequest = require('.')

test('validateRequest', t => {
  t.plan(12)

  const request = {}
  let expected = { valid: false, error: { name: 'ValidationError', message: '"url" is required' } }
  t.same(validateRequest(request), expected)

  request.url = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '"url" must be a string' } }
  t.same(validateRequest(request), expected)

  request.url = 'string'
  expected = { valid: false, error: { name: 'ValidationError', message: '"url" must be a valid uri' } }
  t.same(validateRequest(request), expected)

  request.url = 'http://www.findmypast.co.uk'
  request.method = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '"method" must be a string' } }
  t.same(validateRequest(request), expected)

  request.method = 'string'
  expected = { valid: false, error: { name: 'ValidationError', message: '"method" must be one of [CONNECT, DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE]' } }
  t.same(validateRequest(request), expected)

  request.method = 'GET'
  request.headers = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '"headers" must be an object' } }
  t.same(validateRequest(request), expected)

  request.headers = {}
  request.body = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '"body" must be a string,\n"body" must be an object,\n"body" must be an array' } }
  t.same(validateRequest(request), expected)

  request.body = 'body'
  expected = { valid: true, error: null }
  t.same(validateRequest(request), expected)

  request.body = { key: 'value' }
  expected = { valid: true, error: null }
  t.same(validateRequest(request), expected)

  request.body = [ 'body' ]
  expected = { valid: true, error: null }
  t.same(validateRequest(request), expected)

  request.timeout = 'timeout'
  expected = { valid: false, error: { name: 'ValidationError', message: '"timeout" must be a number' } }
  t.same(validateRequest(request), expected)

  request.timeout = 10000
  expected = { valid: true, error: null }
  t.same(validateRequest(request), expected)
})
