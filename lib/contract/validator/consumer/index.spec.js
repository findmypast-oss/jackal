'use strict'

const tap = require('tap')
const test = tap.test

const validateConsumer = require('.')

test('validateConsumer', t => {
  t.plan(5)

  const ok = { valid: true, error: null }
  t.same(validateConsumer('titan'), ok)
  t.same(validateConsumer('customer-service-api'), ok)
  t.same(validateConsumer('customer_service_ui'), ok)
  t.same(validateConsumer('Neo4j_POC'), ok)

  const notOk = { valid: false, error: { name: 'ValidationError', message: '!"£&*^()*£" is invalid' } }
  t.same(validateConsumer('!"£&*^()*£"'), notOk)
})
