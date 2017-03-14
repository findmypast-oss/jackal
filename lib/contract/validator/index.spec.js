'use strict'

const tap = require('tap')
const test = tap.test

const validate = require('.')

test('validate', t => {
  t.plan(12)

  const contract = {}
  let expected = { valid: false, errors: [ { name: 'ContractValidationError', message: '"name" is required' }, { name: 'NameValidationError', message: 'undefined is invalid' }, { name: 'ConsumerValidationError', message: 'undefined is invalid' } ] }
  t.same(validate(contract), expected)

  contract.name = 123
  expected = { valid: false, errors: [ { name: 'ContractValidationError', message: '"name" must be a string' }, { name: 'NameValidationError', message: '123 is invalid' }, { name: 'ConsumerValidationError', message: 'undefined is invalid' } ] }
  t.same(validate(contract), expected)

  contract.name = 'api | provider'
  expected = { valid: false, errors: [ { name: 'ContractValidationError', message: '"consumer" is required' }, { name: 'ConsumerValidationError', message: 'undefined is invalid' } ] }
  t.same(validate(contract), expected)

  contract.consumer = 123
  expected = { valid: false, errors: [ { name: 'ContractValidationError', message: '"consumer" must be a string' }, { name: 'ConsumerValidationError', message: '123 is invalid' } ] }
  t.same(validate(contract), expected)

  contract.consumer = 'consumer'
  expected = { valid: false, errors: [ { name: 'ContractValidationError', message: '"request" is required' } ] }
  t.same(validate(contract), expected)

  contract.request = 123
  expected = { valid: false, errors: [ { name: 'ContractValidationError', message: '"request" must be an object' } ] }
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
