'use strict'

const validateHook = require('./hook')

describe('validateHook', function (t) {
  let hook, expected

  it('should fail when given an empty hook object', function () {
    hook = {}
    expected = { valid: false, error: { name: 'ValidationError', message: '"name" is required' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a non-string name', function () {
    hook = { name: 123 }
    expected = { valid: false, error: { name: 'ValidationError', message: '"name" must be a string' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a missing request object', function () {
    hook = { name: 'name' }
    expected = { valid: false, error: { name: 'ValidationError', message: '"request" is required' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a non-object request field', function () {
    hook.request = 'request'
    expected = { valid: false, error: { name: 'ValidationError', message: '"request" must be an object' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a request object with a missing baseUrl field', function () {
    hook.request = {}
    expected = { valid: false, error: { name: 'ValidationError', message: '"baseUrl" is required' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a request object with a non-string baseUrl field', function () {
    hook.request.baseUrl = 123
    expected = { valid: false, error: { name: 'ValidationError', message: '"baseUrl" must be a string' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a request object with an invalid baseUrl field', function () {
    hook.request.baseUrl = 'url'
    expected = { valid: false, error: { name: 'ValidationError', message: '"baseUrl" must be a valid uri' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a missing response object', function () {
    hook.request.baseUrl = 'http://path.to.service'
    expected = { valid: false, error: { name: 'ValidationError', message: '"response" is required' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a non-object response field', function () {
    hook.response = 123
    expected = { valid: false, error: { name: 'ValidationError', message: '"response" must be an object' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a response object with a missing statusCode field', function () {
    hook.response = {}
    expected = { valid: false, error: { name: 'ValidationError', message: '"statusCode" is required' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a response object with a non-integer statusCode field', function () {
    hook.response.statusCode = 'string'
    expected = { valid: false, error: { name: 'ValidationError', message: '"statusCode" must be a number' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a response object with an invalid statusCode field', function () {
    hook.response.statusCode = 123456
    expected = { valid: false, error: { name: 'ValidationError', message: '"statusCode" must be one of [100, 101, 102, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511]' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a request object with a non-string path field', function () {
    hook.response.statusCode = 200
    hook.request.path = 123
    expected = { valid: false, error: { name: 'ValidationError', message: '"path" must be a string' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a request object with a non-string query field', function () {
    hook.request.path = 'string'
    hook.request.query = 123
    expected = { valid: false, error: { name: 'ValidationError', message: '"query" must be a string' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a request object with a non-integer timeout field', function () {
    hook.request.query = 'string'
    hook.request.timeout = 'string'
    expected = { valid: false, error: { name: 'ValidationError', message: '"timeout" must be a number' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a request object with a non-object headers field', function () {
    hook.request.timeout = 123
    hook.request.headers = 'string'
    expected = { valid: false, error: { name: 'ValidationError', message: '"headers" must be an object' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a request object with a non-string, non-object, non-array body field', function () {
    hook.request.headers = {}
    hook.request.body = 123
    expected = { valid: false, error: { name: 'ValidationError', message: '"body" must be a string,\n"body" must be an object,\n"body" must be an array' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a request object with a non-string method field', function () {
    hook.request.body = {}
    hook.request.method = 123
    expected = { valid: false, error: { name: 'ValidationError', message: '"method" must be a string' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a request object with an invalid method field', function () {
    hook.request.method = 'STRING'
    expected = { valid: false, error: { name: 'ValidationError', message: '"method" must be one of [CONNECT, DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE]' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a non-object variables field', function () {
    hook.request.method = 'GET'
    hook.variables = 123
    expected = { valid: false, error: { name: 'ValidationError', message: '"variables" must be an object' } }
    expect(validateHook(hook)).to.eql(expected)
  })

  it('should fail when given a hook with a non-boolean rejectUnauthorized field', function () {
    hook.request.method = 'GET'
    hook.request.rejectUnauthorized = 123
    hook.variables = {}
    expected = { valid: false, error: { name: 'ValidationError', message: '"rejectUnauthorized" must be a boolean' } }
    expect(validateHook(hook)).to.eql(expected)
    hook.request.rejectUnauthorized = false
  })
  
  it('should pass when given a valid hook', function () {
    hook.variables = {}
    expected = { valid: true, error: null }
    expect(validateHook(hook)).to.eql(expected)
  })
})
