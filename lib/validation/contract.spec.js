'use strict'

const tap = require('tap')
const test = tap.test

const validateContract = require('./contract')

test('validateContract', function (t) {
  t.plan(4)

  const contract = {}
  contract.request = 123
  let expected = { valid: false, error: { name: 'ValidationError', message: '"request" must be an object' } }
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
