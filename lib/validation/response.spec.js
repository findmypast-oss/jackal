'use strict'

const tap = require('tap')
const test = tap.test

const validateResponse = require('./response')

test('validateResponse', function (t) {
  t.plan(9)

  const response = {}
  let expected = { valid: false, error: { name: 'ValidationError', message: '"statusCode" is required' } }
  t.same(validateResponse(response), expected)

  response.statusCode = 1
  expected = { valid: false, error: { name: 'ValidationError', message: '"statusCode" must be one of [100, 101, 102, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511]' } }
  t.same(validateResponse(response), expected)

  response.statusCode = 200
  response.headers = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '"headers" must be an object' } }
  t.same(validateResponse(response), expected)

  response.headers = {}
  response.body = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '"body" must be a string,\n"body" must be an object,\n"body" must be an array' } }
  t.same(validateResponse(response), expected)

  response.body = 'body'
  expected = { valid: true, error: null }
  t.same(validateResponse(response), expected)

  response.body = {}
  expected = { valid: true, error: null }
  t.same(validateResponse(response), expected)

  response.body = { key: 'value' }
  expected = { valid: true, error: null }
  t.same(validateResponse(response), expected)

  response.body = []
  expected = { valid: true, error: null }
  t.same(validateResponse(response), expected)

  response.body = [ 'hello', 'jackal' ]
  expected = { valid: true, error: null }
  t.same(validateResponse(response), expected)
})
