'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const tokenise = require('.')

test('tokenise - boolean statement', function (t) {
  t.plan(1)

  const input = 'Joi.boolean()'
  const expected = [ 'Joi', 'boolean()' ]
  t.same(tokenise(input), expected)
})

test('tokenise - date statement', function (t) {
  t.plan(1)

  const input = 'Joi.date()'
  const expected = [ 'Joi', 'date()' ]
  t.same(tokenise(input), expected)
})

test('tokenise - date iso statement', function (t) {
  t.plan(1)

  const input = 'Joi.date().iso()'
  const expected = [ 'Joi', 'date()', 'iso()' ]
  t.same(tokenise(input), expected)
})

test('tokenise - integer statement', function (t) {
  t.plan(1)

  const input = 'Joi.number().integer()'
  const expected = [ 'Joi', 'number()', 'integer()' ]
  t.same(tokenise(input), expected)
})

test('tokenise - number statement', function (t) {
  t.plan(1)

  const input = 'Joi.number()'
  const expected = [ 'Joi', 'number()' ]
  t.same(tokenise(input), expected)
})

test('tokenise - string statement', function (t) {
  t.plan(1)

  const input = 'Joi.string()'
  const expected = [ 'Joi', 'string()' ]
  t.same(tokenise(input), expected)
})

test('tokenise - string email statement', function (t) {
  t.plan(1)

  const input = 'Joi.string().email()'
  const expected = [ 'Joi', 'string()', 'email()' ]
  t.same(tokenise(input), expected)
})

test('tokenise - string guid statement', function (t) {
  t.plan(1)

  const input = 'Joi.string().guid()'
  const expected = [ 'Joi', 'string()', 'guid()' ]
  t.same(tokenise(input), expected)
})

test('tokenise - optional statement', function (t) {
  t.plan(1)

  const input = 'Joi.date().iso().optional()'
  const expected = [ 'Joi', 'date()', 'iso()', 'optional()' ]
  t.same(tokenise(input), expected)
})

test('tokenise - required statement', function (t) {
  t.plan(1)

  const input = 'Joi.date().iso().required()'
  const expected = [ 'Joi', 'date()', 'iso()', 'required()' ]
  t.same(tokenise(input), expected)
})

test('tokenise - statement with single allow clause', function (t) {
  t.plan(1)

  const input = 'Joi.date().iso().allow(1)'
  const expected = [ 'Joi', 'date()', 'iso()', 'allow(1)' ]
  t.same(tokenise(input), expected)
})

test('tokenise - statement with multiple allow clauses', function (t) {
  t.plan(1)

  const input = 'Joi.date().iso().allow(1,true,"string")'
  const expected = [ 'Joi', 'date()', 'iso()', 'allow(1,true,"string")' ]
  t.same(tokenise(input), expected)
})
