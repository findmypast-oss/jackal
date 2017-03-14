'use strict'

const tap = require('tap')
const test = tap.test

const validateName = require('.')

test('validateName', t => {
  t.plan(9)

  const ok = { valid: true, error: null }
  t.same(validateName('get_by_id | account'), ok)
  t.same(validateName('get_by_name | account'), ok)
  t.same(validateName('get_by_email | account'), ok)
  t.same(validateName('get_by_merchant_ref | account'), ok)
  t.same(validateName('get_neo4j_stuff | Neo4j_POC'), ok)

  const notOk = { valid: false, error: { name: 'ValidationError', message: 'get_by_id - account is invalid' } }
  t.same(validateName('get_by_id - account'), notOk)
  notOk.error.message = 'get_by_id > account is invalid'
  t.same(validateName('get_by_id > account'), notOk)
  notOk.error.message = 'get_by_id _ account is invalid'
  t.same(validateName('get_by_id _ account'), notOk)
  notOk.error.message = 'get_by_id! | inval!d_servic£ is invalid'
  t.same(validateName('get_by_id! | inval!d_servic£'), notOk)
})
