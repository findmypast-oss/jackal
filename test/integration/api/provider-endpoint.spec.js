'use strict'

const fs = require('fs')
const request = require('request')
const jackal = require('../../helpers/jackal')
const Provider = require('../../helpers/provider')

describe('Provider Endpoint (GET /api/contracts/:provider) Integration Test', function () {
  let dbPath, providerOne, providerTwo

  before(function (done) {
    providerOne = new Provider()
    providerOne.start({ port: 8379 }, done)
  })

  before(function (done) {
    providerTwo = new Provider()
    providerTwo.start({ port: 8380 }, done)
  })

  after(function (done) {
    fs.stat(dbPath, (err, stats) => {
      if (stats) { fs.unlink(dbPath, done) }
      else { done() }
    })
  })

  after(function (done) {
    providerOne.stop(done)
  })

  after(function (done) {
    providerTwo.stop(done)
  })

  context('with failing contracts', function () {
    let port, options

    before(function (done) {
      port = 8378
      dbPath = 'test/integration/api/provider.json'
      options = {
        port: port,
        quiet: true,
        db: { path: dbPath }
      }

      jackal.start(options, done)
    })

    before(function (done) {
      const buf = fs.readFileSync('test/contracts/provider-failing.json')

      const req = {
        url: `http://localhost:${port}/api/contracts`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: buf
      }

      request(req, (err, res, body) => {
        if (err) { return done(err) }
        done()
      })
    })

    after(jackal.stop)

    it('should get a no contracts found message for an unknown provider', function (done) {
      const expected = {
        message: 'No contracts exist for provider: provider_one',
        status: 'NO_CONTRACTS',
        results: []
      }

      request(`http://localhost:${port}/api/contracts/provider_one`, (err, res, body) => {
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(200)
        expect(JSON.parse(body)).to.eql(expected)
        done()
      })
    })

    it('should get a no contracts found message for a second unknown provider', function (done) {
      const expected = {
        message: 'No contracts exist for provider: provider_two',
        status: 'NO_CONTRACTS',
        results: []
      }

      request(`http://localhost:${port}/api/contracts/provider_two`, (err, res, body) => {
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(200)
        expect(JSON.parse(body)).to.eql(expected)
        done()
      })
    })
  })

  context('with passing contracts', function () {
    let port, options

    before(function (done) {
      port = 8378
      dbPath = 'test/integration/api/provider.json'
      options = {
        port: port,
        quiet: true,
        db: { path: dbPath }
      }

      jackal.start(options, done)
    })

    before(function (done) {
      const buf = fs.readFileSync('test/contracts/provider-passing.json')

      const req = {
        url: `http://localhost:${port}/api/contracts`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: buf
      }

      request(req, (err, res, body) => {
        if (err) { return done(err) }
        done()
      })
    })

    after(jackal.stop)

    it('should get a list of contract results for the specified provider', function (done) {
      const expected = {
        message: 'All Passed',
        status: 'PASSED',
        results: [
          { name: 'provider_one/receipt_api/OK', consumer: 'consumer', status: 'Pass', error: null },
          { name: 'provider_one/user_api/OK', consumer: 'consumer', status: 'Pass', error: null }
        ]
      }

      request(`http://localhost:${port}/api/contracts/provider_one`, (err, res, body) => {
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(200)
        expect(JSON.parse(body)).to.eql(expected)
        done()
      })
    })

    it('should get a list of contract results including failures for the specified provider', function (done) {
      const expected = {
        message: 'All Passed',
        status: 'PASSED',
        results: [
          { name: 'provider_two/product_api/OK', consumer: 'consumer', status: 'Pass', error: null }
        ]
      }

      request(`http://localhost:${port}/api/contracts/provider_two`, (err, res, body) => {
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(200)
        expect(JSON.parse(body)).to.eql(expected)
        done()
      })
    })

    it('should get a no contracts found message for an unknown provider', function (done) {
      const expected = {
        message: 'No contracts exist for provider: provider_three',
        status: 'NO_CONTRACTS',
        results: []
      }

      request(`http://localhost:${port}/api/contracts/provider_three`, (err, res, body) => {
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(200)
        expect(JSON.parse(body)).to.eql(expected)
        done()
      })
    })
  })
})
