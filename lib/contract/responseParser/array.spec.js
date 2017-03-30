'use strict'

const Joi = require('joi')

const chai = require('chai')
const expect = chai.expect

const parseResponse = require('.')

describe('parseResponse', function () {
  describe('using an array with a single type', function () {
    const schema = parseResponse({ statusCode: 200, body: [ 'Joi.boolean()' ] }).response

    let webResponse, validation

    it('should pass when given an array of only that type', function () {
      webResponse = { statusCode: 200, body: [ true, false, true, false ] }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.be.null
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
      expect(validation.error).to.be.null
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
})
