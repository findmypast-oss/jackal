'use strict'

const tap = require('tap')
const test = tap.test

const mockery = require('mockery')

const chai = require('chai')
const expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

test('hooks.mapContractHooks', function (t) {
  const beforeHooks = [
    { url: 'URL', method: 'PUT', timeout: 20000 },
    { url: 'URL1', method: 'POST', timeout: 20001, body: '{"json": "body"}' },
    { url: 'URL2', method: 'GET', timeout: 20004 }
  ]

  const afterHooks = [
    { url: 'URL1', method: 'POST', timeout: 20001, body: '{"json": "body"}' }
  ]

  t.plan(1 + beforeHooks.length + afterHooks.length)

  mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
  });

  const requestMock = sinon.stub()
  mockery.registerMock('request', requestMock)
  mockery.registerAllowable('.')
  let mapContractHooks = require('.')

  const contract = { before: beforeHooks, after: afterHooks }

  const beforeHookFunction = mapContractHooks(contract).before
  beforeHookFunction(function () {})
  const afterHookFunction = mapContractHooks(contract).after
  afterHookFunction(function () {})

  t.equal(requestMock.callCount, beforeHooks.length + afterHooks.length)
  beforeHooks.concat(afterHooks).forEach(function (hook, index) {
    t.ok(hook, requestMock.getCall(index).args[0])
  })


})
