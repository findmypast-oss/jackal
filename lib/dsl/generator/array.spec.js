// 'use strict'
//
// const Joi = require('joi')
//
// const tap = require('tap')
// const test = tap.test
//
// const generate = require('.')
//
// test('generate - array with single type', t => {
//   t.plan(0)
//
//   let input = [ [ '[', [ null ], [ [ [ '"', null, [ [ 'boolean' ] ], null, '"' ] ], [ ] ], [ null ], ']' ] ]
//   let schema = generate(input)
//
//   let validation = Joi.validate([ true, false, true, true, false ], schema)
//   // t.ok(validation.error === null)
//   //
//   // validation = Joi.validate([ 'string', true, false ], schema)
//   // t.ok(validation.error !== null)
//   //
//   // validation = Joi.validate([ 'string' ], schema)
//   // t.ok(validation.error !== null)
// })
//
// test('generate - array with multiple types', t => {
//   t.plan(0)
//
//   let input = [ [ '[', [ null ], [ [ [ '"', null, [ [ 'boolean' ] ], null, '"' ] ], [ [ ',', [ null ], [ [ '"', null, [ [ 'integer' ] ], null, '"'] ] ] ] ], [ null ], ']' ] ]
//   let schema = generate(input)
//
//   let validation = Joi.validate({ key: true }, schema)
// })
