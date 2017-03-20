'use strict'

const tap = require('tap')
const test = tap.test

const mapResult = require('.')

test('mapResult', t => {
  t.plan(2)

  const base = { name: 'name', consumer: 'consumer' }

  const failed = Object.assign({}, base, { err: 'Error' })
  t.same(mapResult(failed), Object.assign({}, base, { status: 'Fail' }))

  const passed = Object.assign({}, base, { err: null })
  t.same(mapResult(passed), Object.assign({}, base, { status: 'Pass' }))
})
