'use strict'

const tap = require('tap')
const test = tap.test

const validateName = require('./name')

test('validateName', function (t) {
  t.plan(9)

  const ok = { valid: true, error: null }
  t.same(validateName('account/get_by_id'), ok)
  t.same(validateName('account/get_by_name'), ok)
  t.same(validateName('account/get_by_email'), ok)
  t.same(validateName('account/get_by_merchant_ref'), ok)
  t.same(validateName('neo4j_poc/get_neo4j_stuff'), ok)

  const notOk = { valid: false, error: { name: 'ValidationError', message: 'account-get_by_id is invalid, \'name\' should be in format \'<provider>/<apiName>\' where [a-z0-9_] are valid parameter characters' } }
  t.same(validateName('account-get_by_id', 'name'), notOk)
  notOk.error.message = 'account>get_by_id is invalid, \'name\' should be in format \'<provider>/<apiName>\' where [a-z0-9_] are valid parameter characters'
  t.same(validateName('account>get_by_id', 'name'), notOk)
  notOk.error.message = 'account_get_by_id is invalid, \'name\' should be in format \'<provider>/<apiName>\' where [a-z0-9_] are valid parameter characters'
  t.same(validateName('account_get_by_id', 'name'), notOk)
  notOk.error.message = 'inval!d_servic£/get_by_id! is invalid, \'name\' should be in format \'<provider>/<apiName>\' where [a-z0-9_] are valid parameter characters'
  t.same(validateName('inval!d_servic£/get_by_id!', 'name'), notOk)
})
