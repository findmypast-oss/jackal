'use strict'

const Promise = require('bluebird')
const tap = require('tap')
const test = tap.test

const provider = require('./test-provider')
const jackal = require('./test-jackal')
const contract_v1 = require('./contract-v1')
const contract_v2 = require('./contract-v2')
const consumer = require('.')

test('End to end tests', t => {
  t.plan(1)

  const jackalServer = jackal.start()
    .then(()=> {
      return provider.start()
    })
    // .then(() => {
    //   provider.setContractResponse({ api: 'version 1' })
    //   consumer.send(contract_v1)
    //   consumer.testContracts()
    // })
    // .then(() => {
    //   provider.setContractResponse({ api: 'version 2' })
    //   consumer.testContracts()
    // })
    // .then(() => {
    //   consumer.send(contract_v2)
    //   consumer.testContracts()
    // })
    .then(() => {
      return Promise.promisify(jackalServer.close)()
    })
    .then(() => {
      return provider.stop()
      t.end()
    })
})
