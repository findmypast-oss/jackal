'use strict'

const tap = require('tap')
const test = tap.test

const validateName = require('.')

test('validateName', t => {
  t.plan(9)

  t.ok(validateName('get_by_id | account'))
  t.ok(validateName('get_by_name | account'))
  t.ok(validateName('get_by_email | account'))
  t.ok(validateName('get_by_merchant_ref | account'))
  t.ok(validateName('get_neo4j_stuff | Neo4j_POC'))

  t.notOk(validateName('get_by_id - account'))
  t.notOk(validateName('get_by_id > account'))
  t.notOk(validateName('get_by_id _ account'))

  t.notOk(validateName('get_by_id! | inval!d_servic£'))
})
