'use strict'

const tap = require('tap')
const test = tap.test

const provider = require('./test-provider')
const jackal = require('./test-jackal')
const consumer = require('./test-client')

test('End to end tests', t => {

  const jackalServer = jackal.start()
    .then(()=> {
      return provider.start({
        port: 5000,
        contract: { version: '1' }
      })
    })
    .then(() => {
      return consumer.send(
        'test/integration/contract-v1.json',
        'http://localhost:25863/api/contracts'
      )
    })
    .then(() => {
      return provider.stop()
    })
    .then(() => {
      return provider.start({
        port: 5000,
        contract: { version: 'abc' }
      })
    })
    .then(() => {
      return consumer
        .run('http://localhost:25863/api/contracts/integration')
    })
    .catch((err) => {
      t.match(err, new Error("Some contracts failed"))
      return consumer.send('./contract-v2.json', jackalUrl)
    })
    .then(() => {
      console.log('here');
      return jackalServer.stop()
    })
    .then(() => {
      console.log('here2');
      return provider.stop()
    })
    .then(() => t.end())
})
