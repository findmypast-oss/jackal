'use strict'

const path = require('path')

const tap = require('tap')
const test = tap.test

const send = require('../../client/consumer')
const startServer = require('../../server')
const startProvider = require('./provider')

const jackal = startServer()
const provider = startProvider(1)

const contractsPath = path.join(__dirname, './contracts/v1.json')
const jackalUrl = 'http://localhost:25863/api/contracts'

send(contractsPath, jackalUrl, function (error, response, body) {
  test('integration test', function (t) {
    t.plan(2)

    t.same(response.statusCode, 201)

    const results = JSON.parse(body)
    t.same(results[0].status, 'Pass')
  })
})
