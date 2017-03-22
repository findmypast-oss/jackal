'use strict'

const tap = require('tap')
const test = tap.test

const validateField = require('.')
const ok = { valid: true, error: null }
const notOk = { valid: false, error: { name: 'ValidationError', message: 'Custom Error' } }

test('validateField - Joi.number()', t => {
  t.plan(1)

  t.same(validateField('Joi.number()'), ok)
})

test('validateField - Joi.number().min()', t => {
  t.plan(12)

  t.same(validateField('Joi.number().min(1).integer()'), ok)
  t.same(validateField('Joi.number().min(1).precision(1)'), ok)
  t.same(validateField('Joi.number().min(1).positive()'), ok)
  t.same(validateField('Joi.number().min(1).negative()'), ok)

  t.same(validateField('Joi.number().min(1.2).integer()'), ok)
  t.same(validateField('Joi.number().min(1.2).precision(1)'), ok)
  t.same(validateField('Joi.number().min(1.2).positive()'), ok)
  t.same(validateField('Joi.number().min(1.2).negative()'), ok)

  t.same(validateField(`Joi.number().min('1').integer()`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().min('1').precision(1)`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().min('1').positive()`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().min('1').negative()`, null, 'Custom Error'), notOk)
})

test('validateField - Joi.number().greater()', t => {
  t.plan(12)

  t.same(validateField('Joi.number().greater(1).integer()'), ok)
  t.same(validateField('Joi.number().greater(1).precision(1)'), ok)
  t.same(validateField('Joi.number().greater(1).positive()'), ok)
  t.same(validateField('Joi.number().greater(1).negative()'), ok)

  t.same(validateField('Joi.number().greater(1.2).integer()'), ok)
  t.same(validateField('Joi.number().greater(1.2).precision(1)'), ok)
  t.same(validateField('Joi.number().greater(1.2).positive()'), ok)
  t.same(validateField('Joi.number().greater(1.2).negative()'), ok)

  t.same(validateField(`Joi.number().greater('1').integer()`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().greater('1').precision(1)`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().greater('1').positive()`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().greater('1').negative()`, null, 'Custom Error'), notOk)
})

test('validateField - Joi.number().min().greater()', t => {
  t.plan(4)

  t.same(validateField('Joi.number().min(1).greater(1).integer()', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().min(1).greater(1).precision(1)', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().min(1).greater(1).positive()', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().min(1).greater(1).negative()', null, 'Custom Error'), notOk)
})

test('validateField - Joi.number().max()', t => {
  t.plan(12)

  t.same(validateField('Joi.number().max(1).integer()'), ok)
  t.same(validateField('Joi.number().max(1).precision(1)'), ok)
  t.same(validateField('Joi.number().max(1).positive()'), ok)
  t.same(validateField('Joi.number().max(1).negative()'), ok)

  t.same(validateField('Joi.number().max(1.2).integer()'), ok)
  t.same(validateField('Joi.number().max(1.2).precision(1)'), ok)
  t.same(validateField('Joi.number().max(1.2).positive()'), ok)
  t.same(validateField('Joi.number().max(1.2).negative()'), ok)

  t.same(validateField(`Joi.number().max('1').integer()`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().max('1').precision(1)`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().max('1').positive()`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().max('1').negative()`, null, 'Custom Error'), notOk)
})

test('validateField - Joi.number().less()', t => {
  t.plan(12)

  t.same(validateField('Joi.number().less(1).integer()'), ok)
  t.same(validateField('Joi.number().less(1).precision(1)'), ok)
  t.same(validateField('Joi.number().less(1).positive()'), ok)
  t.same(validateField('Joi.number().less(1).negative()'), ok)

  t.same(validateField('Joi.number().less(1.2).integer()'), ok)
  t.same(validateField('Joi.number().less(1.2).precision(1)'), ok)
  t.same(validateField('Joi.number().less(1.2).positive()'), ok)
  t.same(validateField('Joi.number().less(1.2).negative()'), ok)

  t.same(validateField(`Joi.number().less('1').integer()`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().less('1').precision(1)`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().less('1').positive()`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().less('1').negative()`, null, 'Custom Error'), notOk)
})

test('validateField - Joi.number().max().less()', t => {
  t.plan(4)

  t.same(validateField('Joi.number().max(1).less(1).integer()', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().max(1).less(1).precision(1)', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().max(1).less(1).positive()', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().max(1).less(1).negative()', null, 'Custom Error'), notOk)
})

test('validateField - Joi.number().integer()', t => {
  t.plan(7)

  t.same(validateField('Joi.number().integer()'), ok)
  t.same(validateField('Joi.number().min(1).integer()'), ok)
  t.same(validateField('Joi.number().greater(1).integer()'), ok)
  t.same(validateField('Joi.number().max(1).integer()'), ok)
  t.same(validateField('Joi.number().less(1).integer()'), ok)
  t.same(validateField('Joi.number().integer()'), ok)
  t.same(validateField('Joi.number().integer()'), ok)
})

test('validateField - Joi.number().precision()', t => {
  t.plan(21)

  t.same(validateField('Joi.number().precision(1)'), ok)
  t.same(validateField('Joi.number().min(1).precision(1)'), ok)
  t.same(validateField('Joi.number().greater(1).precision(1)'), ok)
  t.same(validateField('Joi.number().max(1).precision(1)'), ok)
  t.same(validateField('Joi.number().less(1).precision(1)'), ok)
  t.same(validateField('Joi.number().precision(1)'), ok)
  t.same(validateField('Joi.number().precision(1)'), ok)

  t.same(validateField('Joi.number().precision(1.2)', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().min(1).precision(1.2)', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().greater(1).precision(1.2)', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().max(1).precision(1.2)', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().less(1).precision(1.2)', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().precision(1.2)', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().precision(1.2)', null, 'Custom Error'), notOk)

  t.same(validateField(`Joi.number().precision('1.2')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().min(1).precision('1.2')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().greater(1).precision('1.2')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().max(1).precision('1.2')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().less(1).precision('1.2')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().precision('1.2')`, null, 'Custom Error'), notOk)
  t.same(validateField(`Joi.number().precision('1.2')`, null, 'Custom Error'), notOk)
})

test('validateField - Joi.number().integer().precision()', t => {
  t.plan(7)

  t.same(validateField('Joi.number().integer().precision(1)', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().min(1).integer().precision(1)', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().greater(1).integer().precision(1)', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().max(1).integer().precision(1)', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().less(1).integer().precision(1)', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().integer().integer().precision(1)', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().precision(1).integer().precision(1)', null, 'Custom Error'), notOk)
})

test('validateField - Joi.number().positive()', t => {
  t.plan(7)

  t.same(validateField('Joi.number().positive()'), ok)
  t.same(validateField('Joi.number().min(1).positive()'), ok)
  t.same(validateField('Joi.number().greater(1).positive()'), ok)
  t.same(validateField('Joi.number().max(1).positive()'), ok)
  t.same(validateField('Joi.number().less(1).positive()'), ok)
  t.same(validateField('Joi.number().integer().positive()'), ok)
  t.same(validateField('Joi.number().precision(1).positive()'), ok)
})

test('validateField - Joi.number().negative()', t => {
  t.plan(7)

  t.same(validateField('Joi.number().negative()'), ok)
  t.same(validateField('Joi.number().min(1).negative()'), ok)
  t.same(validateField('Joi.number().greater(1).negative()'), ok)
  t.same(validateField('Joi.number().max(1).negative()'), ok)
  t.same(validateField('Joi.number().less(1).negative()'), ok)
  t.same(validateField('Joi.number().integer().negative()'), ok)
  t.same(validateField('Joi.number().precision(1).negative()'), ok)
})

test('validateField - Joi.number().positive().negative()', t => {
  t.plan(7)

  t.same(validateField('Joi.number().positive().negative()', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().min(1).positive().negative()', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().greater(1).positive().negative()', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().max(1).positive().negative()', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().less(1).positive().negative()', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().integer().positive().negative()', null, 'Custom Error'), notOk)
  t.same(validateField('Joi.number().precision(1).positive().negative()', null, 'Custom Error'), notOk)
})
