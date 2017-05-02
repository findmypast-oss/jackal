'use strict'

const fs = require('fs')
const request = require('request')
const jackal = require('../../helpers/jackal')
const Provider = require('../../helpers/provider')

describe('Consumer Endpoint (POST /api/contracts) Integration Test - Before Hooks', function () {
  let providerOne

  before(function (done) {
    providerOne = new Provider()
    providerOne.start({ port: 8379 }, done)
  })

  after(function (done) { providerOne.stop(done) })

  context('with valid, passing contracts', function () {
    let port, dbPath, options

    before(function (done) {
      port = 8378
      dbPath = 'test/integration/api/consumer.json'
      options = {
        port: port,
        quiet: true,
        db: { path: dbPath }
      }

      jackal.start(options, done)
    })

    it('should return a list of contract results for the consumer suite', function (done) {
      const buf = fs.readFileSync('test/contracts/consumer-valid-passing-before-hooks.json')

      const req = {
        url: `http://localhost:${port}/api/contracts`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: buf
      }

      const expected = {
        message: 'All Passed',
        status: 'PASSED',
        results: [
          { name: 'provider_one/user_api/OK', consumer: 'consumer', status: 'Pass', error: null }
        ]
      }

      request(req, (err, res, body) => {
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(201)
        expect(JSON.parse(body)).to.eql(expected)
        done()
      })
    })

    after(function (done) {
      fs.stat(dbPath, (err, stats) => {
        if (stats) { fs.unlink(dbPath, done) }
        else { done() }
      })
    })

    after(jackal.stop)
  })

  context('with valid contracts and a broken before hook', function () {
    let port, dbPath, options

    before(function (done) {
      port = 8378
      dbPath = 'test/integration/api/consumer.json'
      options = {
        port: port,
        quiet: true,
        db: { path: dbPath }
      }

      jackal.start(options, done)
    })

    it('should return a list of contract results for the consumer suite', function (done) {
      const buf = fs.readFileSync('test/contracts/consumer-valid-broken-before-hooks.json')

      const req = {
        url: `http://localhost:${port}/api/contracts`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: buf
      }

      const expected = {
        message: 'Failures Exist',
        status: 'FAILED',
        results: [
          { name: 'provider_one/user_api/OK', consumer: 'consumer', status: 'Fail', error: 'Delete User before hook failed.\nExpected response status: 201, got: 200\n' }
        ]
      }

      request(req, (err, res, body) => {
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(200)
        expect(JSON.parse(body)).to.eql(expected)
        done()
      })
    })

    after(function (done) {
      fs.stat(dbPath, (err, stats) => {
        if (stats) { fs.unlink(dbPath, done) }
        else { done() }
      })
    })

    after(jackal.stop)
  })
})
