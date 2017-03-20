'use strict'

const tap = require('tap')
const test = tap.test

const hashData = require('.')

test('hashData', t => {
  t.plan(3)

  const contract = {
    name: 'name',
    consumer: 'api | provider',
    request: { url: 'http://www.google.com' },
    response: { statusCode: 200 }
  }

  t.throws(() => { hashData(contract) }, Error('Data must be a string or a buffer'))

  const input = JSON.stringify(contract)
  t.same(hashData(input), 'fb4302ded76faefcf77becf4ce98753072c865e7323b8bf653752f08f733ecb9')
  t.same(hashData(input), 'fb4302ded76faefcf77becf4ce98753072c865e7323b8bf653752f08f733ecb9') // check for consistent hashing
})
