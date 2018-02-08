'use strict'

const fs = require('fs')
const request = require('request')
const jackal = require('../../helpers/jackal')
const Provider = require('../../helpers/provider')

describe('Consumer Endpoint (POST /api/contracts) Integration Test - Multiple Consumers', function () {
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
    dbPath = 'test/integration/api/multi-consumer.json'
    options = {
      port: port,
      quiet: true,
      db: { path: dbPath }
    }

    jackal.start(options, done)
  })

  it('should return a list of contract results for the first consumer suite', function (done) {
    const buf = fs.readFileSync('test/contracts/multiple-consumers-consumer-one-valid-passing.json')

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
        { name: 'provider_one/user_api/OK', consumer: 'consumer_one', status: 'Pass', error: null },
        { name: 'provider_one/receipt_api/OK', consumer: 'consumer_one', status: 'Pass', error: null },
        { name: 'provider_two/product_api/OK', consumer: 'consumer_one', status: 'Pass', error: null }
      ]
    }

    request(req, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(201)
      expect(JSON.parse(body)).to.eql(expected)
      done()
    })
  })

  it('should return a list of contract results for the second consumer suite', function (done) {
    const buf = fs.readFileSync('test/contracts/multiple-consumers-consumer-two-valid-passing.json')

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
        { name: 'provider_a/user_api/OK', consumer: 'consumer_two', status: 'Pass', error: null },
        { name: 'provider_b/receipt_api/OK', consumer: 'consumer_two', status: 'Pass', error: null },
        { name: 'provider_c/product_api/OK', consumer: 'consumer_two', status: 'Pass', error: null }
      ]
    }

    request(req, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(201)
      expect(JSON.parse(body)).to.eql(expected)
      done()
    })
  })

  it('should return a list of contract results including failures for the third consumer suite', function (done) {
    const buf = fs.readFileSync('test/contracts/multiple-consumers-consumer-three-valid-failing.json')

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
        { name: 'provider_one/user_api/OK', consumer: 'consumer_three', status: 'Pass', error: null },
        { name: 'provider_one/receipt_api/OK', consumer: 'consumer_three', status: 'Pass', error: null },
        { name: 'provider_two/product_api/OK', consumer: 'consumer_three', status: 'Fail', error: 'Contract failed: "description" must be a number\nresponse.statusCode: 200\nresponse.body: [{"id":1,"name":"Crutch","description":"Walking Aid"},{"id":2,"name":"Jackal","description":"Wild Animal"}]' }
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

  after(function (done) { providerOne.stop(done) })
  after(function (done) { providerTwo.stop(done) })
  after(function (done) { providerThree.stop(done) })

  after(jackal.stop)
})
