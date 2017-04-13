'use strict'

const fs = require('fs')
const request = require('request')
const jackal = require('../../helpers/jackal')
const Provider = require('../../helpers/provider')

describe('Provider Endpoint (GET /api/contracts/:provider) Integration Test - Multiple Providers & Consumers', function () {
  let providerOne, providerTwo, providerThree, port, dbPath, options

  before(function (done) {
    providerOne = new Provider()
    providerOne.start({ port: 8379 }, done)
  })

  before(function (done) {
    providerTwo = new Provider()
    providerTwo.start({ port: 8380 }, done)
  })

  before(function (done) {
    providerThree = new Provider()
    providerThree.start({ port: 8381 }, done)
  })

  before(function (done) {
    port = 8378
    dbPath = 'test/integration/api/multi-provider.json'
    options = {
      port: port,
      quiet: true,
      db: { path: dbPath }
    }

    jackal.start(options, done)
  })

  const contractPaths = [
    'test/contracts/multiple-providers-consumer-one-valid-passing.json',
    'test/contracts/multiple-providers-consumer-two-valid-failing.json'
  ]

  contractPaths.forEach((contractPath) => {
    before(function (done) {
      const buf = fs.readFileSync(contractPath)

      const req = {
        url: `http://localhost:${port}/api/contracts`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: buf
      }

      request(req, (err, res, body) => { if (err) { return done(err) } done() })
    })
  })

  it('should return a list of contract results for the first provider', function (done) {
    const expected = {
      message: 'All Passed',
      status: 'PASSED',
      results: [
        { name: 'provider_one/receipt_api/OK', consumer: 'consumer_one', status: 'Pass', error: null },
        { name: 'provider_one/user_api/OK', consumer: 'consumer_one', status: 'Pass', error: null }
      ]
    }

    request(`http://localhost:${port}/api/contracts/provider_one`, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)
      expect(JSON.parse(body)).to.eql(expected)
      done()
    })
  })

  it('should return a list of contract results for the second provider', function (done) {
    const expected = {
      message: 'All Passed',
      status: 'PASSED',
      results: [
        { consumer: 'consumer_one', error: null, name: 'provider_two/product_api/OK', status: 'Pass' }
      ]
    }

    request(`http://localhost:${port}/api/contracts/provider_two`, (err, res, body) => {
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

  after(function (done) { providerOne.stop(done) })
  after(function (done) { providerTwo.stop(done) })
  after(function (done) { providerThree.stop(done) })

  after(jackal.stop)
})
