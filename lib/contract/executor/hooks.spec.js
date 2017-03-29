'use strict'

const tap = require('tap')
const mockery = require('mockery')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const test = tap.test

test('hooks.requestFunctions', t => {
  const beforeHooks = [
    {url: 'URL', method: 'PUT', timeout: 20000},
    {url: 'URL1', method: 'POST', timeout: 20001, body: '{"json": "body"}'},
    {url: 'URL2', method: 'GET', timeout: 20004}
  ]

  t.plan(1 + beforeHooks.length)

  mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
  });

  const requestMock = sinon.stub()
  mockery.registerMock('request', requestMock);
  mockery.registerAllowable('./hooks');
  let hooks = require('./hooks')

  const contract = { before: beforeHooks }

  const beforeHook = hooks.mapContractHooks(contract).before
  beforeHook(() => {})

  t.equal(requestMock.callCount, beforeHooks.length)
  beforeHooks.forEach((beforeHook, index) => {
    t.ok(beforeHook, requestMock.getCall(index).args[0])
  })

})
