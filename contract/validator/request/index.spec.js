'use strict'

const tap = require('tap')
const test = tap.test

const validateRequest = require('.')

test('validateRequest', t => {
  t.plan(2)

  const request = {}
  let expected = { valid: false, error: { name: 'ValidationError', message: '\t"url" is required' } }
  t.same(validateRequest(request), expected)

  request.url = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '\t"url" must be a string' } }
  t.same(validateRequest(request), expected)
})
