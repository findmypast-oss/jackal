'use strict'

const Joi = require('joi')

const parseResponse = require('./parse-response')

describe('parseResponse', function () {
  describe('using an array with a single type', function () {
    const schema = parseResponse({ statusCode: 200, body: [ 'Joi.boolean()' ] }).response

    let webResponse, validation

    it('should pass when given an array of only that type', function () {
      webResponse = { statusCode: 200, body: [ true, false, true, false ] }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })

    it('should fail when given an array of that type and others', function () {
      webResponse = { statusCode: 200, body: [ 'string', false ] }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.be.null
    })

    it('should fail when given an array of only other types', function () {
      webResponse = { statusCode: 200, body: [ 'string' ] }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.be.null
    })
  })

  describe('using an array with multiple types', function () {
    const schema = parseResponse({ statusCode: 200, body: [ 'Joi.boolean()', 'Joi.number().integer()' ] }).response

    let webResponse, validation

    it('should pass when given an array of only those types', function () {
      webResponse = { statusCode: 200, body: [ true, false, 1, 2, 3 ] }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })

    it('should pass when given an array of those types and others', function () {
      webResponse = { statusCode: 200, body: [ 'string', false, 1, 2, 3 ] }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.be.null
    })

    it('should pass when given an array of only other types', function () {
      webResponse = { statusCode: 200, body: [ 'string' ] }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.be.null
    })
  })

  describe('using an object with single key', function () {
    const schema = parseResponse({ statusCode: 200, body: { key: 'Joi.boolean()' } }).response

    let webResponse, validation

    it('should pass when given an object with key-value pair matching the schema', function () {
      webResponse = { statusCode: 200, body: { key: true } }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })

    it('should pass when given an object with key-value pair matching the schema and unknown pairs', function () {
      webResponse = { statusCode: 200, body: { key: true, keyToo: 'string' } }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })

    it('should pass when given an object with only unknown pairs', function () {
      webResponse = { statusCode: 200, body: { unknown: 'string' } }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })

    it('should fail when given an object with key-value pair not matching the schema', function () {
      webResponse = { statusCode: 200, body: { key: 'string' } }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.be.null
    })
  })

  describe('an object with multiple keys', function () {
    const schema = parseResponse({ statusCode: 200, body: { key: 'Joi.boolean()', keyToo: 'Joi.string()' } }).response

    let webResponse, validation

    it('should pass when given an object with key-value pairs matching the schema', function () {
      webResponse = { statusCode: 200, body: { key: true, keyToo: 'random' } }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })

    it('should pass when given an object with only some of the key-value pairs matching the schema', function () {
      webResponse = { statusCode: 200, body: { key: true } }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist

      webResponse = { statusCode: 200, body: { keyToo: 'random' } }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })

    it('should not pass when given an object with one or more key-value pairs not matching the schema', function () {
      webResponse = { statusCode: 200, body: { key: 'random', keyToo: 'randomToo' } }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.be.null

      webResponse = { statusCode: 200, body: { key: 'random', keyToo: true } }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.be.null
    })

    it('should pass when given an object with only unknown key-value pairs', function () {
      webResponse = { statusCode: 200, body: { unknown: 123 } }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })
  })

  describe('with boolean statements', function () {
    const schema = parseResponse({ statusCode: 200, body: 'Joi.boolean()' }).response

    let webResponse, validation

    const successfulBodies = [ true, false, 'true', 'false', undefined ]
    const failBodies = [ 'string', 123, null ]

    successfulBodies.forEach(function (body) {
      it(`should successfully validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.exist
      })
    })

    failBodies.forEach(function (body) {
      it(`should fail to validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.be.null
      })
    })

    it('should successfully validate with no body field', function () {
      webResponse = { statusCode: 200 }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })
  })

  describe('with date statements', function () {
    const schema = parseResponse({ statusCode: 200, body: 'Joi.date()' }).response
    let webResponse, validation

    const successfulBodies = [
      123, '456', 'Aug 9, 1995', 'Wed, 09 Aug 1995 00:00:00 GMT', 'Wed, 09 Aug 1995 00:00:00',
      'Thu, 01 Jan 1970 00:00:00 GMT', 'Thu, 01 Jan 1970 00:00:00', 'Thu, 01 Jan 1970 00:00:00 GMT-0400',
      '2017-01-01', '2017-01-01T00:00:00', '2017-01-01T00:00:00Z', '2017-01-01T00:00:00.000',
      '2017-01-01T00:00:00+01:00', '2017-01-01T00:00:00-01:00', '2017-01-01T00:00:00.000Z',
      '2017-01-01T00:00:00.000+01:00', '2017-01-01T00:00:00.000-01:00', undefined
    ]

    const failBodies = [ 'string', true, false, null ]

    successfulBodies.forEach(function (body) {
      it(`should successfully validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.exist
      })
    })

    failBodies.forEach(function (body) {
      it(`should fail to validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.be.null
      })
    })

    it('should successfully validate with no body field', function () {
      webResponse = { statusCode: 200 }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })
  })

  describe('with date_iso statements', function () {
    const schema = parseResponse({ statusCode: 200, body: 'Joi.date().iso()' }).response
    let webResponse, validation

    const successfulBodies = [
      '2017-01-01', '2017-01-01T00:00:00', '2017-01-01T00:00:00Z', '2017-01-01T00:00:00.000',
      '2017-01-01T00:00:00+01:00', '2017-01-01T00:00:00-01:00', '2017-01-01T00:00:00.000Z',
      '2017-01-01T00:00:00.000+01:00', '2017-01-01T00:00:00.000-01:00', undefined
    ]

    const failBodies = [
      123, '456', 'Aug 9, 1995', 'Wed, 09 Aug 1995 00:00:00 GMT', 'Wed, 09 Aug 1995 00:00:00',
      'Thu, 01 Jan 1970 00:00:00 GMT', 'Thu, 01 Jan 1970 00:00:00', 'Thu, 01 Jan 1970 00:00:00 GMT-0400',
      'string', true, false, null
    ]

    successfulBodies.forEach(function (body) {
      it(`should successfully validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.exist
      })
    })

    failBodies.forEach(function (body) {
      it(`should fail to validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.be.null
      })
    })

    it('should successfully validate with no body field', function () {
      webResponse = { statusCode: 200 }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })
  })

  describe('with integer statements', function () {
    const schema = parseResponse({ statusCode: 200, body: 'Joi.number().integer()' }).response
    let webResponse, validation

    const successfulBodies = [ 123, '456', undefined ]
    const failBodies = [ 1.23, '4.56', 'string', true, false, null ]

    successfulBodies.forEach(function (body) {
      it(`should successfully validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.exist
      })
    })

    failBodies.forEach(function (body) {
      it(`should fail to validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.be.null
      })
    })

    it('should successfully validate with no body field', function () {
      webResponse = { statusCode: 200 }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })
  })

  describe('with number statements', function () {
    const schema = parseResponse({ statusCode: 200, body: 'Joi.number()' }).response
    let webResponse, validation

    const successfulBodies = [ 123, '456', 1.23, '4.56', undefined ]
    const failBodies = [ 'string', true, false, null ]

    successfulBodies.forEach(function (body) {
      it(`should successfully validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.exist
      })
    })

    failBodies.forEach(function (body) {
      it(`should fail to validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.be.null
      })
    })

    it('should successfully validate with no body field', function () {
      webResponse = { statusCode: 200 }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })
  })

  describe('with string statements', function () {
    const schema = parseResponse({ statusCode: 200, body: 'Joi.string()' }).response
    let webResponse, validation

    const successfulBodies = [ 'string', 'true', '456', '4.56', undefined ]
    const failBodies = [ 123, 1.23, true, false, null ]

    successfulBodies.forEach(function (body) {
      it(`should successfully validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.exist
      })
    })

    failBodies.forEach(function (body) {
      it(`should fail to validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.be.null
      })
    })

    it('should successfully validate with no body field', function () {
      webResponse = { statusCode: 200 }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })
  })

  describe('with string_email statements', function () {
    const schema = parseResponse({ statusCode: 200, body: 'Joi.string().email()' }).response
    let webResponse, validation

    const successfulBodies = [ 'test@domain.com', undefined ]
    const failBodies = [ 'string', 'true', '456', '4.56', 123, 1.23, true, false, null ]

    successfulBodies.forEach(function (body) {
      it(`should successfully validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.exist
      })
    })

    failBodies.forEach(function (body) {
      it(`should fail to validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.be.null
      })
    })

    it('should successfully validate with no body field', function () {
      webResponse = { statusCode: 200 }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })
  })

  describe('with string_guid statements', function () {
    const schema = parseResponse({ statusCode: 200, body: 'Joi.string().guid()' }).response
    let webResponse, validation

    const successfulBodies = [ '123e4567-e89b-12d3-a456-426655440000', undefined ]
    const failBodies = [ 'test@domain.com', 'string', 'true', '456', '4.56', 123, 1.23, true, false, null ]

    successfulBodies.forEach(function (body) {
      it(`should successfully validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.exist
      })
    })

    failBodies.forEach(function (body) {
      it(`should fail to validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.be.null
      })
    })

    it('should successfully validate with no body field', function () {
      webResponse = { statusCode: 200 }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })
  })

  describe('with optional statements', function () {
    const schema = parseResponse({ statusCode: 200, body: 'Joi.number().optional()' }).response
    let webResponse, validation

    const successfulBodies = [ 123, '456', 1.23, '4.56', undefined ]
    const failBodies = [ 'string', true, false, null ]

    successfulBodies.forEach(function (body) {
      it(`should successfully validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.exist
      })
    })

    failBodies.forEach(function (body) {
      it(`should fail to validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.be.null
      })
    })

    it('should successfully validate with no body field', function () {
      webResponse = { statusCode: 200 }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })
  })

  describe('with required statements', function () {
    const schema = parseResponse({ statusCode: 200, body: 'Joi.number().required()' }).response
    let webResponse, validation

    const successfulBodies = [ 123, '456', 1.23, '4.56' ]
    const failBodies = [ 'string', true, false, null, undefined ]

    successfulBodies.forEach(function (body) {
      it(`should successfully validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.exist
      })
    })

    failBodies.forEach(function (body) {
      it(`should fail to validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.be.null
      })
    })

    it('should successfully validate with no body field', function () {
      webResponse = { statusCode: 200 }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.be.null
    })
  })

  describe('with single allow statements', function () {
    const schema = parseResponse({ statusCode: 200, body: 'Joi.boolean().allow(null)' }).response
    let webResponse, validation

    const successfulBodies = [ true, 'true', false, 'false', null, undefined ]
    const failBodies = [ 123, '456', 1.23, '4.56', 'string' ]

    successfulBodies.forEach(function (body) {
      it(`should successfully validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.exist
      })
    })

    failBodies.forEach(function (body) {
      it(`should fail to validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.be.null
      })
    })

    it('should successfully validate with no body field', function () {
      webResponse = { statusCode: 200 }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })
  })

  describe('with multiple allow statements', function () {
    const schema = parseResponse({ statusCode: 200, body: 'Joi.boolean().allow(null).allow("string").allow(1).allow(-1).allow(2.3).allow(-2.3)' }).response
    let webResponse, validation

    const successfulBodies = [ true, 'true', false, 'false', 'string', 1, -1, 2.3, -2.3, null, undefined ]
    const failBodies = [ '1', '-1', '2.3', '-2.3', 123, '456', 1.23, '4.56' ]

    successfulBodies.forEach(function (body) {
      it(`should successfully validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.exist
      })
    })

    failBodies.forEach(function (body) {
      it(`should fail to validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.be.null
      })
    })

    it('should successfully validate with no body field', function () {
      webResponse = { statusCode: 200 }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })
  })

  describe('with multiple allow statements', function () {
    const schema = parseResponse({ statusCode: 200, body: 'Joi.boolean().allow([null,"string",1,-1,2.3,-2.3])' }).response
    let webResponse, validation

    const successfulBodies = [ true, 'true', false, 'false', 'string', 1, -1, 2.3, -2.3, null, undefined ]
    const failBodies = [ '1', '-1', '2.3', '-2.3', 123, '456', 1.23, '4.56' ]

    successfulBodies.forEach(function (body) {
      it(`should successfully validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.exist
      })
    })

    failBodies.forEach(function (body) {
      it(`should fail to validate body: ${body}, type: ${typeof body}`, function () {
        webResponse = { statusCode: 200, body: body }
        validation = Joi.validate(webResponse, schema)
        expect(validation.error).to.not.be.null
      })
    })

    it('should successfully validate with no body field', function () {
      webResponse = { statusCode: 200 }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.not.exist
    })
  })
})
