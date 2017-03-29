'use strict'

const tap = require('tap')
const test = tap.test

const validateConsumer = require('.')

test('validateConsumer', function (t) {
  t.plan(5)

  const ok = { valid: true, error: null }
  t.same(validateConsumer('titan'), ok)
  t.same(validateConsumer('customer_service_api'), ok)
  t.same(validateConsumer('customer_service_ui'), ok)
  t.same(validateConsumer('neo4j_poc'), ok)

  const notOk = { valid: false, error: { name: 'ValidationError', message: '!"£&*^()*£" is invalid, \'consumer\' should be in format \'<consumer>\' where [a-z0-9_] are valid parameter characters' } }
  t.same(validateConsumer('!"£&*^()*£"', 'consumer'), notOk)
})
