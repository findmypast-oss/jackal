'use strict'

const Joi = require('joi')

const chai = require('chai')
const expect = chai.expect

const parseResponse = require('.')

describe('parseResponse', function () {
  describe('using an object with single key', function () {
    const schema = parseResponse({ statusCode: 200, body: { key: 'Joi.boolean()' } }).response

    let webResponse, validation

    it('should pass when given an object with key-value pair matching the schema', function () {
      webResponse = { statusCode: 200, body: { key: true } }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.be.null
    })

    it('should pass when given an object with key-value pair matching the schema and unknown pairs', function () {
      webResponse = { statusCode: 200, body: { key: true, keyToo: 'string' } }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.be.null
    })

    it('should pass when given an object with only unknown pairs', function () {
      webResponse = { statusCode: 200, body: { unknown: 'string' } }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.be.null
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
      expect(validation.error).to.be.null
    })

    it('should pass when given an object with only some of the key-value pairs matching the schema', function () {
      webResponse = { statusCode: 200, body: { key: true } }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.be.null

      webResponse = { statusCode: 200, body: { keyToo: 'random' } }
      validation = Joi.validate(webResponse, schema)
      expect(validation.error).to.be.null
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
      expect(validation.error).to.be.null
    })
  })
})
