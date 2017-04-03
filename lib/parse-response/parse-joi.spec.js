'use strict'

const Joi = require('joi')

const chai = require('chai')
const expect = chai.expect

const parseJoi = require('./parse-joi')

describe('parseResponse', function () {
  describe('with arrays', function () {
    it('should work with an array with single type', function () {
      const input = 'Joi.array().items([Joi.boolean()])'
      const schema = parseJoi(input)

      let validation = Joi.validate([ true, false, true, true, false ], schema)
      expect(validation.error).to.be.null

      validation = Joi.validate([ 'string', true, false ], schema)
      expect(validation.error).to.not.be.null

      validation = Joi.validate([ 'string' ], schema)
      expect(validation.error).to.not.be.null
    })

    it('should work with an array with multiple types', function () {
      const input = 'Joi.array().items([Joi.boolean(),Joi.number().integer()])'
      const schema = parseJoi(input)

      let validation = Joi.validate([ true, false, 1, 2, 3 ], schema)
      expect(validation.error).to.be.null

      validation = Joi.validate([ 'string', true, false, 1, 2, 3 ], schema)
      expect(validation.error).to.not.be.null

      validation = Joi.validate([ 'string' ], schema)
      expect(validation.error).to.not.be.null
    })
  })

  describe('with objects', function () {
    it('should work with an object with single key', function () {
      const input = 'Joi.object({"key":"Joi.boolean()"})'
      const schema = parseJoi(input)

      let validation = Joi.validate({ key: true }, schema)
      expect(validation.error).to.be.null

      validation = Joi.validate({ key: 'string' }, schema)
      expect(validation.error).to.not.be.null
    })

    it('should work with an object with single key using keys function', function () {
      const input = 'Joi.object().keys({"key":"Joi.boolean()"})'
      const schema = parseJoi(input)

      let validation = Joi.validate({ key: true }, schema)
      expect(validation.error).to.be.null

      validation = Joi.validate({ key: 'string' }, schema)
      expect(validation.error).to.not.be.null
    })

    it('should work with an object with multiple keys', function () {
      const input = 'Joi.object({"key":"Joi.boolean()","keyToo":"Joi.string()"})'
      const schema = parseJoi(input)

      let validation = Joi.validate({ key: true, keyToo: 'string' }, schema)
      expect(validation.error).to.be.null

      validation = Joi.validate({ key: 'string', keyToo: 'string' }, schema)
      expect(validation.error).to.not.be.null

      validation = Joi.validate({ key: true, keyToo: true }, schema)
      expect(validation.error).to.not.be.null
    })

    it('should work with an object with multiple keys using keys function', function () {
      const input = 'Joi.object().keys({"key":"Joi.boolean()","keyToo":"Joi.string()"})'
      const schema = parseJoi(input)

      let validation = Joi.validate({ key: true, keyToo: 'string' }, schema)
      expect(validation.error).to.be.null

      validation = Joi.validate({ key: 'string', keyToo: 'string' }, schema)
      expect(validation.error).to.not.be.null

      validation = Joi.validate({ key: true, keyToo: true }, schema)
      expect(validation.error).to.not.be.null
    })
  })

  describe('with boolean statements', function () {
    const input = 'Joi.boolean()'
    const schema = parseJoi(input)

    let validation

    const successfulArgs = [ true, false, 'true', 'false', undefined ]
    const failArgs = [ 'string', 123, null ]

    successfulArgs.forEach(function (arg) {
      it(`should successfully validate: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.be.null
      })
    })

    failArgs.forEach(function (arg) {
      it(`should fail to validate: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.not.be.null
      })
    })
  })

  describe('with date statements', function () {
    const input = 'Joi.date()'
    const schema = parseJoi(input)

    let validation

    const successfulBodies = [
      123, '456', 'Aug 9, 1995', 'Wed, 09 Aug 1995 00:00:00 GMT', 'Wed, 09 Aug 1995 00:00:00',
      'Thu, 01 Jan 1970 00:00:00 GMT', 'Thu, 01 Jan 1970 00:00:00', 'Thu, 01 Jan 1970 00:00:00 GMT-0400',
      '2017-01-01', '2017-01-01T00:00:00', '2017-01-01T00:00:00Z', '2017-01-01T00:00:00.000',
      '2017-01-01T00:00:00+01:00', '2017-01-01T00:00:00-01:00', '2017-01-01T00:00:00.000Z',
      '2017-01-01T00:00:00.000+01:00', '2017-01-01T00:00:00.000-01:00', undefined
    ]

    const failBodies = [ 'string', true, false, null ]

    successfulBodies.forEach(function (arg) {
      it(`should successfully validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.be.null
      })
    })

    failBodies.forEach(function (arg) {
      it(`should fail to validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.not.be.null
      })
    })
  })

  describe('with date_iso statements', function () {
    const input = 'Joi.date().iso()'
    const schema = parseJoi(input)

    let validation

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

    successfulBodies.forEach(function (arg) {
      it(`should successfully validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.be.null
      })
    })

    failBodies.forEach(function (arg) {
      it(`should fail to validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.not.be.null
      })
    })
  })

  describe('with integer statements', function () {
    const input = 'Joi.number().integer()'
    const schema = parseJoi(input)

    let validation

    const successfulBodies = [ 123, '456', undefined ]
    const failBodies = [ 1.23, '4.56', 'string', true, false, null ]

    successfulBodies.forEach(function (arg) {
      it(`should successfully validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.be.null
      })
    })

    failBodies.forEach(function (arg) {
      it(`should fail to validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.not.be.null
      })
    })
  })

  describe('with number statements', function () {
    const input = 'Joi.number()'
    const schema = parseJoi(input)

    let validation

    const successfulBodies = [ 123, '456', 1.23, '4.56', undefined ]
    const failBodies = [ 'string', true, false, null ]

    successfulBodies.forEach(function (arg) {
      it(`should successfully validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.be.null
      })
    })

    failBodies.forEach(function (arg) {
      it(`should fail to validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.not.be.null
      })
    })
  })

  describe('with string statements', function () {
    const input = 'Joi.string()'
    const schema = parseJoi(input)

    let validation

    const successfulBodies = [ 'string', 'true', '456', '4.56', undefined ]
    const failBodies = [ 123, 1.23, true, false, null ]

    successfulBodies.forEach(function (arg) {
      it(`should successfully validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.be.null
      })
    })

    failBodies.forEach(function (arg) {
      it(`should fail to validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.not.be.null
      })
    })
  })

  describe('with string_email statements', function () {
    const input = 'Joi.string().email()'
    const schema = parseJoi(input)

    let validation

    const successfulBodies = [ 'test@domain.com', undefined ]
    const failBodies = [ 'string', 'true', '456', '4.56', 123, 1.23, true, false, null ]

    successfulBodies.forEach(function (arg) {
      it(`should successfully validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.be.null
      })
    })

    failBodies.forEach(function (arg) {
      it(`should fail to validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.not.be.null
      })
    })
  })

  describe('with string_guid statements', function () {
    const input = 'Joi.string().guid()'
    const schema = parseJoi(input)

    let validation

    const successfulBodies = [ '123e4567-e89b-12d3-a456-426655440000', undefined ]
    const failBodies = [ 'test@domain.com', 'string', 'true', '456', '4.56', 123, 1.23, true, false, null ]

    successfulBodies.forEach(function (arg) {
      it(`should successfully validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.be.null
      })
    })

    failBodies.forEach(function (arg) {
      it(`should fail to validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.not.be.null
      })
    })
  })

  describe('with optional statements', function () {
    const input = 'Joi.number().optional()'
    const schema = parseJoi(input)

    let validation

    const successfulBodies = [ 123, '456', 1.23, '4.56', undefined ]
    const failBodies = [ 'string', true, false, null ]

    successfulBodies.forEach(function (arg) {
      it(`should successfully validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.be.null
      })
    })

    failBodies.forEach(function (arg) {
      it(`should fail to validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.not.be.null
      })
    })
  })

  describe('with required statements', function () {
    const input = 'Joi.number().required()'
    const schema = parseJoi(input)
    let validation

    const successfulBodies = [ 123, '456', 1.23, '4.56' ]
    const failBodies = [ 'string', true, false, null, undefined ]

    successfulBodies.forEach(function (arg) {
      it(`should successfully validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.be.null
      })
    })

    failBodies.forEach(function (arg) {
      it(`should fail to validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.not.be.null
      })
    })
  })

  describe('with single allow statements', function () {
    const input = 'Joi.boolean().allow(null)'
    const schema = parseJoi(input)

    let validation

    const successfulBodies = [ true, 'true', false, 'false', null, undefined ]
    const failBodies = [ 123, '456', 1.23, '4.56', 'string' ]

    successfulBodies.forEach(function (arg) {
      it(`should successfully validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.be.null
      })
    })

    failBodies.forEach(function (arg) {
      it(`should fail to validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.not.be.null
      })
    })
  })

  describe('with multiple allow statements', function () {
    const input = 'Joi.boolean().allow(null).allow("string").allow(1).allow(-1).allow(2.3).allow(-2.3)'
    const schema = parseJoi(input)

    let validation

    const successfulBodies = [ true, 'true', false, 'false', 'string', 1, -1, 2.3, -2.3, null, undefined ]
    const failBodies = [ '1', '-1', '2.3', '-2.3', 123, '456', 1.23, '4.56' ]

    successfulBodies.forEach(function (arg) {
      it(`should successfully validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.be.null
      })
    })

    failBodies.forEach(function (arg) {
      it(`should fail to validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.not.be.null
      })
    })
  })

  describe('with multiple allow statements in array', function () {
    const input = `Joi.boolean().allow([null,'string',1,-1,2.3,-2.3])`
    const schema = parseJoi(input)

    let validation

    const successfulBodies = [ true, 'true', false, 'false', 'string', 1, -1, 2.3, -2.3, null, undefined ]
    const failBodies = [ '1', '-1', '2.3', '-2.3', 123, '456', 1.23, '4.56' ]

    successfulBodies.forEach(function (arg) {
      it(`should successfully validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.be.null
      })
    })

    failBodies.forEach(function (arg) {
      it(`should fail to validate arg: ${arg}, type: ${typeof arg}`, function () {
        validation = Joi.validate(arg, schema)
        expect(validation.error).to.not.be.null
      })
    })
  })
})
