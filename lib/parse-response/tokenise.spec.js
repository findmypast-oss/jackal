'use strict'

const Joi = require('joi')

const chai = require('chai')
const expect = chai.expect

const tokenise = require('./tokenise')

describe('tokenise', function () {
  it('should tokenise an array with a single item', function () {
    const input = 'Joi.array().items([Joi.boolean()])'
    const expected = [ 'Joi', 'array()', 'items([Joi.boolean()])' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })

  it('should tokenise an array with multiple items', function () {
    const input = 'Joi.array().items([Joi.boolean(),Joi.number().integer()])'
    const expected = [ 'Joi', 'array()', 'items([Joi.boolean(),Joi.number().integer()])' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })

  it('should work with an object with single key', function () {
    const input = 'Joi.object({key: Joi.boolean()})'
    const expected = [ 'Joi', 'object({key: Joi.boolean()})' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })

  it('should work with an object with single key using keys object', function () {
    const input = 'Joi.object().keys({key: Joi.boolean()})'
    const expected = [ 'Joi', 'object()', 'keys({key: Joi.boolean()})' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })

  it('should work with an object with multiple keys', function () {
    const input = 'Joi.object({key: Joi.boolean(),keyToo:Joi.string()})'
    const expected = [ 'Joi', 'object({key: Joi.boolean(),keyToo:Joi.string()})' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })

  it('should work with an object with multiple keys using keys object', function () {
    const input = 'Joi.object().keys({key: Joi.boolean(),keyToo:Joi.string()})'
    const expected = [ 'Joi', 'object()', 'keys({key: Joi.boolean(),keyToo:Joi.string()})' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })

  it('should work with a boolean statement', function () {
    const input = 'Joi.boolean()'
    const expected = [ 'Joi', 'boolean()' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })

  it('should work with a date statement', function () {
    const input = 'Joi.date()'
    const expected = [ 'Joi', 'date()' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })

  it('should work with a date iso statement', function () {
    const input = 'Joi.date().iso()'
    const expected = [ 'Joi', 'date()', 'iso()' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })

  it('should work with a integer statement', function () {
    const input = 'Joi.number().integer()'
    const expected = [ 'Joi', 'number()', 'integer()' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })

  it('should work with a number statement', function () {
    const input = 'Joi.number()'
    const expected = [ 'Joi', 'number()' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })

  it('should work with a string statement', function () {
    const input = 'Joi.string()'
    const expected = [ 'Joi', 'string()' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })

  it('should work with a string email statement', function () {
    const input = 'Joi.string().email()'
    const expected = [ 'Joi', 'string()', 'email()' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })

  it('should work with a string guid statement', function () {
    const input = 'Joi.string().guid()'
    const expected = [ 'Joi', 'string()', 'guid()' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })

  it('should work with a optional statement', function () {
    const input = 'Joi.date().iso().optional()'
    const expected = [ 'Joi', 'date()', 'iso()', 'optional()' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })

  it('should work with a required statement', function () {
    const input = 'Joi.date().iso().required()'
    const expected = [ 'Joi', 'date()', 'iso()', 'required()' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })

  it('should work with a statement with single allow clause', function () {
    const input = 'Joi.date().iso().allow(1)'
    const expected = [ 'Joi', 'date()', 'iso()', 'allow(1)' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })

  it('should work with a statement with multiple allow clauses', function () {
    const input = 'Joi.date().iso().allow(1,true,"string")'
    const expected = [ 'Joi', 'date()', 'iso()', 'allow(1,true,"string")' ]
    expect(tokenise(input)).to.be.deep.equal(expected)
  })
})
