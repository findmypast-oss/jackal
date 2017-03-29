'use strict'

const tap = require('tap')
const test = tap.test

const validateContract = require('.')

test('validateContract', function (t) {
  t.plan(9)

  const contract = {}
  let expected = { valid: false, error: { name: 'ValidationError', message: '"name" is required' } }
  t.same(validateContract(contract), expected)

  contract.name = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '"name" must be a string' } }
  t.same(validateContract(contract), expected)

  contract.name = 'name'
  expected = { valid: false, error: { name: 'ValidationError', message: '"consumer" is required' } }
  t.same(validateContract(contract), expected)

  contract.consumer = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '"consumer" must be a string' } }
  t.same(validateContract(contract), expected)

  contract.consumer = 'consumer'
  expected = { valid: false, error: { name: 'ValidationError', message: '"request" is required' } }
  t.same(validateContract(contract), expected)

  contract.request = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '"request" must be an object' } }
  t.same(validateContract(contract), expected)

  contract.request = {}
  expected = { valid: false, error: { name: 'ValidationError', message: '"response" is required' } }
  t.same(validateContract(contract), expected)

  contract.response = 123
  expected = { valid: false, error: { name: 'ValidationError', message: '"response" must be an object' }}
  t.same(validateContract(contract), expected)

  contract.response = {}
  expected = { valid: true, error: null }
  t.same(validateContract(contract), expected)
})
