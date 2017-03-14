'use strict'

const tap = require('tap')
const test = tap.test

const validateConsumer = require('.')

test('validateConsumer', t => {
  t.plan(5)

  t.ok(validateConsumer('titan'))
  t.ok(validateConsumer('customer-service-api'))
  t.ok(validateConsumer('customer_service_ui'))
  t.ok(validateConsumer('Neo4j_POC'))

  t.notOk(validateConsumer('!"£&*^()*£"'))
})
