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

  mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
  });

  const requestMock = sinon.stub()
  mockery.registerMock('request', requestMock);
  mockery.registerAllowable('./hooks');
  let hooks = require('./hooks')

  const beforeHooks = [
    {url: 'URL', method: 'PUT', timeout: 20000},
    {url: 'URL', method: 'PUT', timeout: 20000},
    {url: 'URL', method: 'PUT', timeout: 20000}
  ]

  const contract = { before: beforeHooks }

  const beforeHook = hooks.mapContractHooks(contract).before
  beforeHook(() => {})
  t.equal(requestMock.callCount, beforeHooks.length)
  expect(requestMock).to.have.been.calledWith(sinon.match({uri: 'URL', method: 'PUT', timeout: 20000}))
  t.end()

})
