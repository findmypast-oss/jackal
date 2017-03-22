'use strict'

const tap = require('tap')
const test = tap.test

const validateField = require('.')
const ok = { valid: true, error: null }
const notOk = { valid: false, error: { name: 'ValidationError', message: 'Custom Error' } }

test('validateField - Joi.string()', t => {
  t.plan(1)

  t.same(validateField('Joi.string()'), ok)
})
