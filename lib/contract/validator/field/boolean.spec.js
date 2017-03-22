'use strict'

const tap = require('tap')
const test = tap.test

const validateField = require('.')
const ok = { valid: true, error: null }
const notOk = { valid: false, error: { name: 'ValidationError', message: 'Custom Error' } }

test('validateField - Joi.boolean()', t => {
  t.plan(19)

  t.same(validateField('Joi.boolean()'), ok)

  t.same(validateField(`Joi.boolean().truthy('Y')`), ok)
  t.same(validateField(`Joi.boolean().truthy(123)`), ok)
  t.same(validateField(`Joi.boolean().truthy(1.23)`), ok)
  // t.same(validateField(`Joi.boolean().truthy(null)`), ok)
  t.same(validateField(`Joi.boolean().truthy(undefined)`), ok)
  t.same(validateField(`Joi.boolean().truthy('Y').truthy(123).truthy(1.23).truthy(undefined)`), ok)
  t.same(validateField(`Joi.boolean().truthy([ 'Y', 123, 1.23, undefined ])`), ok)
  // t.same(validateField(`Joi.boolean().truthy('Y').truthy(123).truthy(1.23).truthy(undefined).truthy([ 'Y', 123, 1.23, undefined ])`), ok)

  t.same(validateField(`Joi.boolean().falsy('Y')`), ok)
  t.same(validateField(`Joi.boolean().falsy(123)`), ok)
  t.same(validateField(`Joi.boolean().falsy(1.23)`), ok)
  // t.same(validateField(`Joi.boolean().falsy(null)`), ok)
  t.same(validateField(`Joi.boolean().falsy(undefined)`), ok)
  t.same(validateField(`Joi.boolean().falsy('Y').falsy(123).falsy(1.23).falsy(undefined)`), ok)
  t.same(validateField(`Joi.boolean().falsy([ 'Y', 123, 1.23, undefined ])`), ok)
  // t.same(validateField(`Joi.boolean().falsy('Y').falsy(123).falsy(1.23).falsy(undefined).falsy([ 'Y', 123, 1.23, undefined ])`), ok

  t.same(validateField(`Joi.boolean().truthy('Y').falsy('N')`), ok)
  t.same(validateField(`Joi.boolean().truthy(123).falsy(321)`), ok)
  t.same(validateField(`Joi.boolean().truthy(1.23).falsy(3.21)`), ok)
  // t.same(validateField(`Joi.boolean().truthy(null).falsy(null)`), ok)
  t.same(validateField(`Joi.boolean().truthy(undefined).falsy(undefined)`), ok)
  t.same(validateField(`Joi.boolean().truthy('Y').falsy('N').truthy(123).falsy(321).truthy(1.23).falsy(3.21).truthy(undefined).falsy(undefined)`), ok)
  t.same(validateField(`Joi.boolean().truthy([ 'Y', 123, 1.23, undefined ]).falsy([ 'N', 321, 3.21, undefined ])`), ok)
  // t.same(validateField(`Joi.boolean().truthy('Y').falsy('N').truthy(123).falsy(321).truthy(1.23).falsy(3.21).truthy(undefined).falsy(undefined).truthy([ 'Y', 123, 1.23, undefined ]).falsy([ 'N', 321, 3.21, undefined ])`), ok)
})
