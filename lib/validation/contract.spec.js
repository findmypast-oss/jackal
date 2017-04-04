'use strict'

const chai = require('chai')
const expect = chai.expect

const validateContract = require('./contract')

describe('validateContract', function () {
  let contract, expected

  it('should fail without a request', function () {
    contract = {}
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
