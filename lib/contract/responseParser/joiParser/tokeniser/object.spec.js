'use strict'

const Joi = require('joi')

const tap = require('tap')
const test = tap.test

const tokenise = require('.')

test('tokenise - object with single key', function (t) {
  t.plan(1)

  const input = 'Joi.object({key: Joi.boolean()})'
  const expected = [ 'Joi', 'object({key: Joi.boolean()})' ]
  t.same(tokenise(input), expected)
})

test('tokenise - object with single key using keys object', function (t) {
  t.plan(1)

  const input = 'Joi.object().keys({key: Joi.boolean()})'
  const expected = [ 'Joi', 'object()', 'keys({key: Joi.boolean()})' ]
  t.same(tokenise(input), expected)
})

test('tokenise - object with multiple keys', function (t) {
  t.plan(1)

  const input = 'Joi.object({key: Joi.boolean(),keyToo:Joi.string()})'
  const expected = [ 'Joi', 'object({key: Joi.boolean(),keyToo:Joi.string()})' ]
  t.same(tokenise(input), expected)
})

test('tokenise - object with multiple keys using keys object', function (t) {
  t.plan(1)

  const input = 'Joi.object().keys({key: Joi.boolean(),keyToo:Joi.string()})'
  const expected = [ 'Joi', 'object()', 'keys({key: Joi.boolean(),keyToo:Joi.string()})' ]
  t.same(tokenise(input), expected)
})
