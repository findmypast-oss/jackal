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
  t.same(validateName('get_neo4j_stuff | neo4j_poc'), ok)

  const notOk = { valid: false, error: { name: 'ValidationError', message: 'get_by_id - account is invalid, \'name\' should be in format \'<apiName> | <provider>\' where [a-zA-Z0-9_] are valid parameter characters' } }
  t.same(validateName('get_by_id - account', 'name'), notOk)
  notOk.error.message = 'get_by_id > account is invalid, \'name\' should be in format \'<apiName> | <provider>\' where [a-zA-Z0-9_] are valid parameter characters'
  t.same(validateName('get_by_id > account', 'name'), notOk)
  notOk.error.message = 'get_by_id _ account is invalid, \'name\' should be in format \'<apiName> | <provider>\' where [a-zA-Z0-9_] are valid parameter characters'
  t.same(validateName('get_by_id _ account', 'name'), notOk)
  notOk.error.message = 'get_by_id! | inval!d_servic£ is invalid, \'name\' should be in format \'<apiName> | <provider>\' where [a-zA-Z0-9_] are valid parameter characters'
  t.same(validateName('get_by_id! | inval!d_servic£', 'name'), notOk)
})
