'use strict'

const chai = require('chai')
const expect = chai.expect

const validateRequest = require('.')

describe('validateRequest', function (t) {
  let request, expected

  it('should fail when given an empty request object', function () {
    request = {}
    expected = { valid: false, error: { name: 'ValidationError', message: '"url" is required' } }
    expect(validateRequest(request)).to.be.deep.equal(expected)
  })

  it('should fail when given a request object with non-string url', function () {
    request.url = 123
    expected = { valid: false, error: { name: 'ValidationError', message: '"url" must be a string' } }
    expect(validateRequest(request)).to.be.deep.equal(expected)
  })

  it('should fail when given a request object with invalid url', function () {
    request.url = 'string'
    expected = { valid: false, error: { name: 'ValidationError', message: '"url" must be a valid uri' } }
    expect(validateRequest(request)).to.be.deep.equal(expected)
  })

  it('should fail when given a request object with valid url and non-string method', function () {
    request.url = 'http://www.findmypast.co.uk'
    request.method = 123
    expected = { valid: false, error: { name: 'ValidationError', message: '"method" must be a string' } }
    expect(validateRequest(request)).to.be.deep.equal(expected)
  })

  it('should fail when given a request object with valid url and invalid method', function () {
    request.method = 'string'
    expected = { valid: false, error: { name: 'ValidationError', message: '"method" must be one of [CONNECT, DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE]' } }
    expect(validateRequest(request)).to.be.deep.equal(expected)
  })

  it('should fail when given a request object with valid url, valid method but non-object headers', function () {
    request.method = 'GET'
    request.headers = 123
    expected = { valid: false, error: { name: 'ValidationError', message: '"headers" must be an object' } }
    expect(validateRequest(request)).to.be.deep.equal(expected)
  })

  it('should fail when given a request object with valid url, valid method, valid headers but invalid body', function () {
    request.headers = {}
    request.body = 123
    expected = { valid: false, error: { name: 'ValidationError', message: '"body" must be a string,\n"body" must be an object,\n"body" must be an array' } }
    expect(validateRequest(request)).to.be.deep.equal(expected)
  })

  it('should pass when given a request object with string body', function () {
    request.body = 'body'
    expected = { valid: true, error: null }
    expect(validateRequest(request)).to.be.deep.equal(expected)
  })

  it('should pass when given a request object with object body', function () {
    request.body = { key: 'value' }
    expected = { valid: true, error: null }
    expect(validateRequest(request)).to.be.deep.equal(expected)
  })

  it('should pass when given a request object with array body', function () {
    request.body = [ 'body' ]
    expected = { valid: true, error: null }
    expect(validateRequest(request)).to.be.deep.equal(expected)
  })

  it('should fail when given a request object with non-integer timeout', function () {
    request.timeout = 'timeout'
    expected = { valid: false, error: { name: 'ValidationError', message: '"timeout" must be a number' } }
    expect(validateRequest(request)).to.be.deep.equal(expected)
  })

  it('should pass when given a request object with integer timeout', function () {
    request.timeout = 10000
    expected = { valid: true, error: null }
    expect(validateRequest(request)).to.be.deep.equal(expected)
  })
})
