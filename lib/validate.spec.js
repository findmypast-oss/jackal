'use strict'

const chai = require('chai')
const expect = chai.expect

const validate = require('./validate')

describe('validate', function () {
  let contract, expected

  it('should fail with an integer request property', function () {
    contract = {}
    contract.request = 123
    expected = { valid: false, errors: [ { name: 'ContractValidationError', message: '"request" must be an object' } ] }
    expect(validate(contract)).to.be.deep.equal(expected)
  })

  it('should fail with an empty request property', function () {
    contract.request = {}
    expected = { valid: false, errors: [ { name: 'ContractValidationError', message: '"response" is required' }, { name: 'RequestValidationError', message: '"url" is required' } ] }
    expect(validate(contract)).to.be.deep.equal(expected)
  })

  it('should fail with an invalid request url', function () {
    contract.request.url = 'url'
    expected = { valid: false, errors: [ { name: 'ContractValidationError', message: '"response" is required' }, { name: 'RequestValidationError', message: '"url" must be a valid uri' } ] }
    expect(validate(contract)).to.be.deep.equal(expected)
  })

  it('should fail with a valid request property, valid consumer property and valid name property only', function () {
    contract.request.url = 'http://www.google.com'
    expected = { valid: false, errors: [ { name: 'ContractValidationError', message: '"response" is required' } ] }
    expect(validate(contract)).to.be.deep.equal(expected)
  })

  it('should fail with an integer response property', function () {
    contract.response = 123
    expected = { valid: false, errors: [ { name: 'ContractValidationError', message: '"response" must be an object' } ] }
    expect(validate(contract)).to.be.deep.equal(expected)
  })

  it('should fail with an empty request property', function () {
    contract.response = {}
    expected = { valid: false, errors: [ { name: 'ResponseValidationError', message: '"statusCode" is required' } ] }
    expect(validate(contract)).to.be.deep.equal(expected)
  })

  it('should pass with a valid consumer, name, request and response property', function () {
    contract.response.statusCode = 200
    expected = { valid: true, errors: null }
    expect(validate(contract)).to.be.deep.equal(expected)
  })
})
