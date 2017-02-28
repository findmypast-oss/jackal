'use strict'

const tap = require('tap')
const test = tap.test

const validateContract = require('.')

test('validateContract', t => {
  t.plan(9)

  const contract = {}
  let expected = { valid: false, error: { name: 'ValidationError', message: '\t"name" is required' } }
  t.same(validateContract(contract), expected)

  contract.name = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '\t"name" must be a string' } }
  t.same(validateContract(contract), expected)

  contract.name = 'name'
  expected = { valid: false, error: { name: 'ValidationError', message: '\t"consumer" is required' } }
  t.same(validateContract(contract), expected)

  contract.consumer = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '\t"consumer" must be a string' } }
  t.same(validateContract(contract), expected)

  contract.consumer = 'consumer'
  expected = { valid: false, error: { name: 'ValidationError', message: '\t"request" is required' } }
  t.same(validateContract(contract), expected)

  contract.request = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '\t"request" must be a string' } }
  t.same(validateContract(contract), expected)

  contract.request = 'request'
  expected = { valid: false, error: { name: 'ValidationError', message: '\t"response" is required' } }
  t.same(validateContract(contract), expected)

  contract.response = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '\t"response" must be an object' } }
  t.same(validateContract(contract), expected)

  contract.response = {}
  expected = { valid: true, error: null }
  t.ok(validateContract(contract), expected)

  // validate request objects
  // validate response objects
})
