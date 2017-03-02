'use strict'

const tap = require('tap')
const test = tap.test

const stringify = require('.')

test('stringify', t => {
  t.plan(3)

  const basic = [
    { name: 'name', consumer: 'consumer', request: { url: 'http://www.google.com' }, response: { statusCode: 200 } }
  ]
  t.same(stringify(basic), '[ {"name":"name","consumer":"consumer","request":{"url":"http://www.google.com"},"response":{"statusCode":200}} ]')

  const stringResponseBody = [
    {
      name: 'name',
      consumer: 'consumer',
      request: {
        url: 'http://www.google.com',
        method: 'GET',
        headers: {
          key: 'value'
        },
        body: 'body'
      },
      response: {
        statusCode: 200,
        headers: {
          key: 'value'
        },
        body: 'body'
      }
    }
  ]
  t.same(stringify(stringResponseBody), '[ {"name":"name","consumer":"consumer","request":{"url":"http://www.google.com","method":"GET","headers":{"key":"value"},"body":"body"},"response":{"statusCode":200,"headers":{"key":"value"},"body":"body"}} ]')

  const objectResponseBody = [
    {
      name: 'name',
      consumer: 'consumer',
      request: {
        url: 'http://www.google.com',
        method: 'GET',
        headers: {
          key: 'value'
        },
        body: 'body'
      },
      response: {
        statusCode: 200,
        headers: {
          key: 'value'
        },
        body: {
          key: 'value'
        }
      }
    }
  ]
  t.same(stringify(objectResponseBody), '[ {"name":"name","consumer":"consumer","request":{"url":"http://www.google.com","method":"GET","headers":{"key":"value"},"body":"body"},"response":{"statusCode":200,"headers":{"key":"value"},"body":{"key":"value"}}} ]')
})
