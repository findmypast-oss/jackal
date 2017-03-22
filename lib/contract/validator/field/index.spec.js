'use strict'

const tap = require('tap')
const test = tap.test

const validateField = require('.')

test('validateField', t => {
  t.plan(4)

  const ok = { valid: true, error: null }
  t.same(validateField('Joi.boolean()'), ok)
  t.same(validateField('Joi.date()'), ok)
  t.same(validateField('Joi.number()'), ok)
  t.same(validateField('Joi.string()'), ok)
})
