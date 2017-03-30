'use strict'

const chai = require('chai')
const expect = chai.expect

const validateResponse = require('.')

describe('validateResponse', function () {
  let response, expected

  it('should fail when given an empty response object', function () {
    response = {}
    expected = { valid: false, error: { name: 'ValidationError', message: '"statusCode" is required' } }
    expect(validateResponse(response)).to.be.deep.equal(expected)
  })

  it('should fail when given a response object with an invalid status code', function () {
    response.statusCode = 1
    expected = { valid: false, error: { name: 'ValidationError', message: '"statusCode" must be one of [100, 101, 102, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511]' } }
    expect(validateResponse(response)).to.be.deep.equal(expected)
  })

  it('should fail when given a response object with a valid status code and invalid headers', function () {
    response.statusCode = 200
    response.headers = 123
    expected = { valid: false, error: { name: 'ValidationError', message: '"headers" must be an object' } }
    expect(validateResponse(response)).to.be.deep.equal(expected)
  })

  it('should fail when given a response object with a valid status code and headers but invalid body', function () {
    response.headers = {}
    response.body = 123
    expected = { valid: false, error: { name: 'ValidationError', message: '"body" must be a string,\n"body" must be an object,\n"body" must be an array' } }
    expect(validateResponse(response)).to.be.deep.equal(expected)
  })

  it('should pass when given a valid response with string body', function () {
    response.body = 'body'
    expected = { valid: true, error: null }
    expect(validateResponse(response)).to.be.deep.equal(expected)
  })

  it('should pass when given a valid response with empty body object', function () {
    response.body = {}
    expected = { valid: true, error: null }
    expect(validateResponse(response)).to.be.deep.equal(expected)
  })

  it('should pass when given a valid response with non-empty body object', function () {
    response.body = { key: 'value' }
    expected = { valid: true, error: null }
    expect(validateResponse(response)).to.be.deep.equal(expected)
  })

  it('should pass when given a valid response with empty body array', function () {
    response.body = []
    expected = { valid: true, error: null }
    expect(validateResponse(response)).to.be.deep.equal(expected)
  })

  it('should pass when given a valid response with non-empty body array', function () {
    response.body = [ 'hello', 'jackal' ]
    expected = { valid: true, error: null }
    expect(validateResponse(response)).to.be.deep.equal(expected)
  })
})
