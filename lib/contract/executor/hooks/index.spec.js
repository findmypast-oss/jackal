'use strict'

const tap = require('tap')
const test = tap.test

const mockery = require('mockery')

const chai = require('chai')
const expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

test('hooks.requestFunctions', function (t) {
  const beforeHooks = [
    { url: 'URL', method: 'PUT', timeout: 20000 },
    { url: 'URL1', method: 'POST', timeout: 20001, body: '{"json": "body"}' },
    { url: 'URL2', method: 'GET', timeout: 20004 }
  ]

  t.plan(1 + beforeHooks.length)

  mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
  });

  const requestMock = sinon.stub()
  mockery.registerMock('request', requestMock)
  mockery.registerAllowable('.')
  let mapContractHooks = require('.')

  const contract = { before: beforeHooks }

  const beforeHook = mapContractHooks(contract).before
  beforeHook(function () {})

  t.equal(requestMock.callCount, beforeHooks.length)
  beforeHooks.forEach(function (beforeHook, index) {
    t.ok(beforeHook, requestMock.getCall(index).args[0])
  })

})
