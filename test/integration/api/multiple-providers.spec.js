'use strict'

const fs = require('fs')
const request = require('request')
const jackal = require('./helpers-v2/jackal')
const Provider = require('./helpers-v2/provider')

describe('Consumer Endpoint (POST /api/contracts) Integration Test', function () {
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
    dbPath = 'test/integration/api/consumer.json'
    options = {
      port: port,
      quiet: true,
      db: { path: dbPath }
    }

    jackal.start(options, done)
  })

  const contractPaths = [
    'test/integration/api/contracts/multiple-providers-consumer-one-valid-passing.json',
    'test/integration/api/contracts/multiple-providers-consumer-two-valid-failing.json'
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
    request(`http://localhost:${port}/api/contracts/provider_one`, (err, res, body) => {
      expect(err).to.be.null
      expect(res.statusCode).to.equal(200)

      const bodyObj = JSON.parse(body)
      const expected = [
        { name: 'provider_one/receipt_api/OK', consumer: 'consumer_two', status: 'Pass', error: null },
        { name: 'provider_one/user_api/OK', consumer: 'consumer_two', status: 'Pass', error: null },
        { name: 'provider_one/receipt_api/OK', consumer: 'consumer_one', status: 'Pass', error: null },
        { name: 'provider_one/user_api/OK', consumer: 'consumer_one', status: 'Pass', error: null }
      ]

      expect(bodyObj).to.eql(expected)
      done()
    })
  })

  it('should return a list of contract results including failures for the second provider', function (done) {
    request(`http://localhost:${port}/api/contracts/provider_two`, (err, res, body) => {
      expect(err).to.be.null
      expect(res.statusCode).to.equal(200)

      const expected = [
        {
          consumer: 'consumer_two',
          error: 'Error: Contract failed: "description" must be a number',
          name: 'provider_two/product_api/OK',
          status: 'Fail'
        }, {
          consumer: 'consumer_one',
          error: null,
          name: 'provider_two/product_api/OK',
          status: 'Pass'
        }
      ]

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
