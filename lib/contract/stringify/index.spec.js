'use strict'

const tap = require('tap')
const test = tap.test

const stringify = require('.')

test('stringify', t => {
  t.plan(1)

  const input = [
    {
      name: 'name',
      consumer: 'consumer',
      request: {
        url: 'http://www.google.com'
      },
      response: {
        statusCode: 200
      }
    }
  ]
  t.same(stringify(input), '[ {"name":"name","consumer":"consumer","request":{"url":"http://www.google.com"},"response":{"statusCode":200}} ]')
})
