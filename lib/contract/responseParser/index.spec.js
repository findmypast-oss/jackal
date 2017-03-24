// 'use strict'
//
// const Joi = require('joi')
// const tap = require('tap')
// const test = tap.test
//
// const parseResponse = require('.')
//
// test('parseResponse', t => {
//   t.plan(20)
//
//   const statusCodeOnly = { statusCode: 200 }
//   t.ok(Joi.validate(statusCodeOnly, statusCodeOnly).error === null)
//
//   const statusCodeStringBody = { statusCode: 200, body: 'hello, world!' }
//   t.ok(Joi.validate(statusCodeStringBody, statusCodeStringBody).error === null)
//
//   const statusCodeJoiBodyInput = { statusCode: 200, body: 'Joi.string()' }
//   const statusCodeJoiBodyResponse = { statusCode: 200, body: 'hello, world!' }
//   t.ok(Joi.validate(statusCodeJoiBodyResponse, parseResponse(statusCodeJoiBodyInput)).error === null)
//
//   const statusCodeObjectBodyInput = { statusCode: 200, body: { key: 'Joi.string()' } }
//   const statusCodeObjectBodyResponse = { statusCode: 200, body: { key: 'hello, world!' } }
//   t.ok(Joi.validate(statusCodeObjectBodyResponse, parseResponse(statusCodeObjectBodyInput)).error === null)
//
//   const statusCodeObjectBodyUnspecifiedFieldInput = { statusCode: 200, body: { key: 'Joi.string()' } }
//   const statusCodeObjectBodyUnspecifiedFieldResponse = { statusCode: 200, body: { key: 'hello, world!', keyToo: 'unspecified' } }
//   t.ok(Joi.validate(statusCodeObjectBodyUnspecifiedFieldResponse, parseResponse(statusCodeObjectBodyUnspecifiedFieldInput)).error === null)
//
//   const statusCodeInnerObjectBodyInput = { statusCode: 200, body: { innerObject: { innerObjectKey: 'Joi.number().integer()' }, outerKey: 'Joi.string()' } }
//   const statusCodeInnerObjectBodyResponse = { statusCode: 200, body: { innerObject: { innerObjectKey: 1 }, outerKey: 'key' } }
//   t.ok(Joi.validate(statusCodeInnerObjectBodyResponse, parseResponse(statusCodeInnerObjectBodyInput)).error === null)
//
//   const statusCodeStringBodyHeaders = { statusCode: 200, body: 'hello, world!', headers: { 'Content-Type': 'application/json' } }
//   t.ok(Joi.validate(statusCodeStringBodyHeaders, parseResponse(statusCodeStringBodyHeaders)).error === null)
//
//   const statusCodeJoiBodyHeadersInput = { statusCode: 200, body: 'Joi.number().integer()', headers: { 'Content-Type': 'application/json' } }
//   const statusCodeJoiBodyHeadersResponse = { statusCode: 200, body: 123, headers: { 'Content-Type': 'application/json' } }
//   t.ok(Joi.validate(statusCodeJoiBodyHeadersResponse, parseResponse(statusCodeJoiBodyHeadersInput)).error === null)
//
//   const statusCodeObjectBodyHeadersInput = { statusCode: 200, body: { key: 'Joi.string()' }, headers: { 'Content-Type': 'application/json' } }
//   const statusCodeObjectBodyHeadersResponse = { statusCode: 200, body: { key: 'hello, world!' }, headers: { 'Content-Type': 'application/json' } }
//   t.ok(Joi.validate(statusCodeObjectBodyHeadersResponse, parseResponse(statusCodeObjectBodyHeadersInput)).error === null)
//
//   const statusCodeInnerObjectBodyHeadersInput = { statusCode: 200, body: { innerObject: { innerObjectKey: 'Joi.number().integer()' }, outerKey: 'Joi.string()' }, headers: { 'Content-Type': 'application/json' } }
//   const statusCodeInnerObjectBodyHeadersResponse = { statusCode: 200, body: { innerObject: { innerObjectKey: 1 }, outerKey: 'key' }, headers: { 'Content-Type': 'application/json' } }
//   t.ok(Joi.validate(statusCodeInnerObjectBodyHeadersResponse, parseResponse(statusCodeInnerObjectBodyHeadersInput)).error === null)
//
//   const statusCodeStringBodyJoiHeaders = { statusCode: 200, body: 'hello, world!', headers: { 'Content-Type': 'Joi.string()' } }
//   t.ok(Joi.validate(statusCodeStringBodyHeaders, parseResponse(statusCodeStringBodyHeaders)).error === null)
//
//   const statusCodeJoiBodyJoiHeadersInput = { statusCode: 200, body: 'Joi.number().integer()', headers: { 'Content-Type': 'Joi.string()' } }
//   const statusCodeJoiBodyJoiHeadersResponse = { statusCode: 200, body: 123, headers: { 'Content-Type': 'application/json' } }
//   t.ok(Joi.validate(statusCodeJoiBodyHeadersResponse, parseResponse(statusCodeJoiBodyHeadersInput)).error === null)
//
//   const statusCodeObjectBodyJoiHeadersInput = { statusCode: 200, body: { key: 'Joi.string()' }, headers: { 'Content-Type': 'Joi.string()' } }
//   const statusCodeObjectBodyJoiHeadersResponse = { statusCode: 200, body: { key: 'hello, world!' }, headers: { 'Content-Type': 'application/json' } }
//   t.ok(Joi.validate(statusCodeObjectBodyHeadersResponse, parseResponse(statusCodeObjectBodyHeadersInput)).error === null)
//
//   const statusCodeInnerObjectBodyJoiHeadersInput = { statusCode: 200, body: { innerObject: { innerObjectKey: 'Joi.number().integer()' }, outerKey: 'Joi.string()' }, headers: { 'Content-Type': 'Joi.string()' } }
//   const statusCodeInnerObjectBodyJoiHeadersResponse = { statusCode: 200, body: { innerObject: { innerObjectKey: 1 }, outerKey: 'key' }, headers: { 'Content-Type': 'application/json' } }
//   t.ok(Joi.validate(statusCodeInnerObjectBodyHeadersResponse, parseResponse(statusCodeInnerObjectBodyHeadersInput)).error === null)
//
//   const statusCodeStringArrayBody = { statusCode: 200, body: [ 'hello, world!', 'goodbye, world!' ] }
//   t.ok(Joi.validate(statusCodeStringArrayBody, parseResponse(statusCodeStringArrayBody)).error === null)
//
//   const statusCodeJoiArrayBodyInput = { statusCode: 200, body: [ 'Joi.number().integer()' ] }
//   const statusCodeJoiArrayBodyResponse = { statusCode: 200, body: [ 1, 2, 3 ] }
//   t.ok(Joi.validate(statusCodeJoiArrayBodyResponse, parseResponse(statusCodeJoiArrayBodyInput)).error === null)
//
//   const statusCodeObjectArrayBodyInput = { statusCode: 200, body: [ { key: 'value' } ] }
//   const statusCodeObjectArrayBodyResponse = { statusCode: 200, body: [ { key: 'value' }, { key: 'value' } ] }
//   t.ok(Joi.validate(statusCodeObjectArrayBodyInput, parseResponse(statusCodeObjectArrayBodyResponse)).error === null)
//
//   const statusCodeObjectJoiArrayBodyInput = { statusCode: 200, body: [ { key: 'Joi.string()' } ] }
//   const statusCodeObjectJoiArrayBodyResponse = { statusCode: 200, body: [ { key: 'value' }, { key: 'anotherValue' } ] }
//   t.ok(Joi.validate(statusCodeObjectJoiArrayBodyResponse, parseResponse(statusCodeObjectJoiArrayBodyInput)).error === null)
//
//   const statusCodeObjectInnerObjectArrayBodyInput = { statusCode: 200, body: [ { inner: { key: 'Joi.string()' }, outer: 'Joi.number().integer()' } ] }
//   const statusCodeObjectInnerObjectArrayBodyResponse = { statusCode: 200, body: [ { inner: { key: 'value' }, outer: 1 }, { inner: { key: 'anotherValue' }, outer: 2 } ] }
//   t.ok(Joi.validate(statusCodeObjectInnerObjectArrayBodyResponse, parseResponse(statusCodeObjectInnerObjectArrayBodyInput)).error === null)
//
//   const statusCodeMixedArrayBodyInput = { statusCode: 200, body: [ 'Joi.string()', { key: 'Joi.number().integer()' } ] }
//   const statusCodeMixedArrayBodyResponse = { statusCode: 200, body: [ 'hello', 'jackal', { key: 123 } ] }
//   t.ok(Joi.validate(statusCodeMixedArrayBodyResponse, parseResponse(statusCodeMixedArrayBodyInput)).error === null)
// })
