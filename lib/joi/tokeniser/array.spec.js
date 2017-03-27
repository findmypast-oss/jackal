'use strict'

const tap = require('tap')
const test = tap.test

const tokenise = require('.')

test('tokenise - array single item', t => {
  t.plan(1)

  const input = 'Joi.array().items([Joi.boolean()])'
  const expected = [ 'Joi', 'array()', 'items([Joi.boolean()])' ]
  t.same(tokenise(input), expected)
})

test('tokenise - array multiple items', t => {
  t.plan(1)

  const input = 'Joi.array().items([Joi.boolean(),Joi.number().integer()])'
  const expected = [ 'Joi', 'array()', 'items([Joi.boolean(),Joi.number().integer()])' ]
  t.same(tokenise(input), expected)
})
