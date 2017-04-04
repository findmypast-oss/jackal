'use strict'

const tap = require('tap')
const test = tap.test

const validate = require('./validate')

test('validate', function (t) {
  t.plan(7)

  const contract = {}
  contract.request = 123
  let expected = { valid: false, errors: [ { name: 'ContractValidationError', message: '"request" must be an object' } ] }
  t.same(validate(contract), expected)

  contract.request = {}
  expected = { valid: false, errors: [ { name: 'ContractValidationError', message: '"response" is required' }, { name: 'RequestValidationError', message: '"url" is required' } ] }
  t.same(validate(contract), expected)

  contract.request.url = 'url'
  expected = { valid: false, errors: [ { name: 'ContractValidationError', message: '"response" is required' }, { name: 'RequestValidationError', message: '"url" must be a valid uri' } ] }
  t.same(validate(contract), expected)

  contract.request.url = 'http://www.google.com'
  expected = { valid: false, errors: [ { name: 'ContractValidationError', message: '"response" is required' } ] }
  t.same(validate(contract), expected)

  contract.response = 123
  expected = { valid: false, errors: [ { name: 'ContractValidationError', message: '"response" must be an object' } ] }
  t.same(validate(contract), expected)

  contract.response = {}
  expected = { valid: false, errors: [ { name: 'ResponseValidationError', message: '"statusCode" is required' } ] }
  t.same(validate(contract), expected)

  contract.response.statusCode = 200
  expected = { valid: true, errors: null }
  t.same(validate(contract), expected)
})
