'use strict'

const chai = require('chai')
const expect = chai.expect

const validateContract = require('./contract')

describe('validateContract', function () {
  let contract, expected

  it('should fail with an empty contract', function () {
    contract = {}
    expected = { valid: false, error: { name: 'ValidationError', message: '"name" is required' } }
    expect(validateContract(contract)).to.be.deep.equal(expected)
  })

  it('should fail with a non-string name', function () {
    contract.name = 123
    expected = { valid: false, error: { name: 'ValidationError', message: '"name" must be a string' } }
    expect(validateContract(contract)).to.be.deep.equal(expected)
  })

  it('should fail without a consumer', function () {
    contract.name = 'name'
    expected = { valid: false, error: { name: 'ValidationError', message: '"consumer" is required' } }
    expect(validateContract(contract)).to.be.deep.equal(expected)
  })

  it('should fail with a non-string consumer', function () {
    contract.consumer = 123
    expected = { valid: false, error: { name: 'ValidationError', message: '"consumer" must be a string' } }
    expect(validateContract(contract)).to.be.deep.equal(expected)
  })

  it('should fail without a request', function () {
    contract.consumer = 'consumer'
    expected = { valid: false, error: { name: 'ValidationError', message: '"request" is required' } }
    expect(validateContract(contract)).to.be.deep.equal(expected)
  })

  it('should fail with a non-object request', function () {
    contract.request = 123
    expected = { valid: false, error: { name: 'ValidationError', message: '"request" must be an object' } }
    expect(validateContract(contract)).to.be.deep.equal(expected)
  })

  it('should fail without a response', function () {
    contract.request = {}
    expected = { valid: false, error: { name: 'ValidationError', message: '"response" is required' } }
    expect(validateContract(contract)).to.be.deep.equal(expected)
  })

  it('should fail with a non-object response', function () {
    contract.response = 123
    expected = { valid: false, error: { name: 'ValidationError', message: '"response" must be an object' }}
    expect(validateContract(contract)).to.be.deep.equal(expected)
  })

  it('should pass when all fields are present and the right type', function () {
    contract.response = {}
    expected = { valid: true, error: null }
    expect(validateContract(contract)).to.be.deep.equal(expected)
  })
})
