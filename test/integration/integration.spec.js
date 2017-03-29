'use strict'

const t = require('tap')
const tapromise = require('tapromise')
const Promise = require('bluebird')

const provider = require('./test-provider')
const jackal = require('./test-jackal')
const consumer = require('./test-client')

Promise.resolve()
  .then(() => jackal.start())
  .then(() => {
    return provider.start({
      port: 5000,
      contract: { version: '1' }
    })
  })
  .then(() => {
    t.test("Version 1 of contract passes", (t) => {
      t = tapromise(t)

      return Promise.resolve(t.match(
        consumer.send('test/integration/contract-v1.json','http://localhost:25863/api/contracts'),
        [
          {
            name: 'integration/contract',
            consumer: 'consumer',
            status: 'Pass',
            error: null
          }
        ]
      ))
    })

  }).then(() => t.end())
  // .finally(() => {
  //   jackal.stop()
  //   provider.stop()
  //   console.log("FINALLY")
  //   // process.exit(0)
  // })

    // .then(() => {
    //   return provider.stop()
    // })
    // .then(() => {
    //   return provider.start({
    //     port: 5000,
    //     contract: { version: 'abc' }
    //   })
    // })
    // .then(() => {
    //   return consumer
    //     .run('http://localhost:25863/api/contracts/integration')
    //     .catch((res, err) => {
    //       console.log('catch result', res);
    //       console.log('catch err', err);
    //       return t.test("Provider has made a breaking change", (t) => {
    //         console.log('status', res[0].status);
    //         t.match(res[0].status, 'Fail')
    //         t.end()
    //       })
    //     })
    // })
    // .then(() => {
    //   return consumer.send(
    //     'test/integration/contract-v2.json',
    //     'http://localhost:25863/api/contracts'
    //   ).then((res, err) => {
    //     console.log(err);
    //     console.log(res);
    //     return t.test("Version 2 of contract passes", (t) => {
    //       t.plan(1)
    //       t.match(res[0].status, 'Pass')
    //     })
    //   })
    //   .catch((err) => {
    //     console.log("here!!");
    //     console.log(err);
    //   })
    // })
