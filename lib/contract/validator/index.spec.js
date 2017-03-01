'use strict'

const tap = require('tap')
const test = tap.test

const validate = require('.')

test('validate', t => {
  t.plan(12)

  const contract = {}
  let expected = { valid: false, errors: [ { name: 'ValidationError', message: '\t"name" is required' } ] }
  t.same(validate(contract), expected)

  contract.name = 123
  expected = { valid: false, errors: [ { name: 'ValidationError', message: '\t"name" must be a string' } ] }
  t.same(validate(contract), expected)

  contract.name = 'name'
  expected = { valid: false, errors: [ { name: 'ValidationError', message: '\t"consumer" is required' } ] }
  t.same(validate(contract), expected)

  contract.consumer = 123
  expected = { valid: false, errors: [ { name: 'ValidationError', message: '\t"consumer" must be a string' } ] }
  t.same(validate(contract), expected)

  contract.consumer = 'consumer'
  expected = { valid: false, errors: [ { name: 'ValidationError', message: '\t"request" is required' } ] }
  t.same(validate(contract), expected)

  contract.request = 123
  expected = { valid: false, errors: [ { name: 'ValidationError', message: '\t"request" must be an object' } ] }
  t.same(validate(contract), expected)

  contract.request = {}
  expected = { valid: false, errors: [ { name: 'ValidationError', message: '\t"response" is required' }, { name: 'ValidationError', message: '\t"url" is required' } ] }
  t.same(validate(contract), expected)

  contract.request.url = 'url'
  expected = { valid: false, errors: [ { name: 'ValidationError', message: '\t"response" is required' }, { name: 'ValidationError', message: '\t"url" must be a valid uri' } ] }
  t.same(validate(contract), expected)

  contract.request.url = 'http://www.google.com'
  expected = { valid: false, errors: [ { name: 'ValidationError', message: '\t"response" is required' } ] }
  t.same(validate(contract), expected)

  contract.response = 123
  expected = { valid: false, errors: [ { name: 'ValidationError', message: '\t"response" must be an object' } ] }
  t.same(validate(contract), expected)

  contract.response = {}
  expected = { valid: false, errors: [ { name: 'ValidationError', message: '\t"statusCode" is required' } ] }
  t.same(validate(contract), expected)

  contract.response.statusCode = 200
  expected = { valid: true, errors: null }
  t.same(validate(contract), expected)
})
