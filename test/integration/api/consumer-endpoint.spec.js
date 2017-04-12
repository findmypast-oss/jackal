'use strict'

const fs = require('fs')
const request = require('request')
const jackal = require('../helpers/jackal')
const Provider = require('../helpers/provider')

describe('Consumer Endpoint (POST /api/contracts) Integration Test', function () {
  let providerOne, providerTwo

  before(function (done) {
    providerOne = new Provider()
    providerOne.start({ port: 8379 }, done)
  })

  before(function (done) {
    providerTwo = new Provider()
    providerTwo.start({ port: 8380 }, done)
  })

  after(function (done) { providerOne.stop(done) })
  after(function (done) { providerTwo.stop(done) })

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
      const buf = fs.readFileSync('test/integration/contracts/consumer-valid-passing.json')

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
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(201)

        const bodyObj = JSON.parse(body)
        const expected = [
          { name: 'provider_one/user_api/OK', consumer: 'consumer', status: 'Pass', error: null },
          { name: 'provider_one/receipt_api/OK', consumer: 'consumer', status: 'Pass', error: null },
          { name: 'provider_two/product_api/OK', consumer: 'consumer', status: 'Pass', error: null }
        ]

        expect(bodyObj).to.eql(expected)
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

  context('with valid, failing contracts', function () {
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
      const buf = fs.readFileSync('test/integration/contracts/consumer-valid-failing.json')

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
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(201)

        const bodyObj = JSON.parse(body)
        const expected = [
          { name: 'provider_one/user_api/OK', consumer: 'consumer', status: 'Pass', error: null },
          { name: 'provider_one/receipt_api/OK', consumer: 'consumer', status: 'Pass', error: null },
          { name: 'provider_two/product_api/OK', consumer: 'consumer', status: 'Fail', error: 'Error: Contract failed: "description" must be a number' }
        ]

        expect(bodyObj).to.eql(expected)
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

  context('with invalid contracts - multiple consumers', function () {
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

    it('should return a message advising a single consumer is required', function (done) {
      const buf = fs.readFileSync('test/integration/contracts/consumer-invalid-multi-consumer.json')

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
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(400)
        expect(JSON.parse(body)).to.eql({ message: 'Contract object must contain a single consumer' })
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

  context('with invalid contracts - missing field(s)', function () {
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

    it('should return a list of contract validations for the consumer suite', function (done) {
      const buf = fs.readFileSync('test/integration/contracts/consumer-invalid-missing-field.json')

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
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(400)

        const expected = {
          message: 'One or more contracts are invalid',
          validations: [
            { contract: 'provider_one/user_api/OK <- consumer', errors: null, valid: true },
            { contract: 'provider_one/receipt_api/OK <- consumer', errors: null, valid: true },
            { contract: 'provider_two/product_api/OK <- consumer', errors: [ { message: '"request" is required', name: "ContractValidationError" } ], valid: false }
          ]
        }

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

  context('with invalid contracts - malformed joi', function () {
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

    it('should return a list of contract validations for the consumer suite', function (done) {
      const buf = fs.readFileSync('test/integration/contracts/consumer-invalid-malformed-joi.json')

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
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(400)

        const expected = {
          message: 'One or more contracts are invalid',
          validations: [ { contract: 'provider_two/product_api/OK <- consumer', errors: [ { message: 'Joi string not well formed', name: 'JoiError' } ], valid: false } ]
        }

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

  context('with invalid contracts - unsupported joi', function () {
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

    it('should return a list of contract validations for the consumer suite', function (done) {
      const buf = fs.readFileSync('test/integration/contracts/consumer-invalid-unsupported-joi.json')

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
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(400)

        const expected = {
          message: 'One or more contracts are invalid',
          validations: [ { contract: 'provider_two/product_api/OK <- consumer', errors: [ { message: 'Joi type not supported', name: 'JoiError' } ], valid: false } ]
        }

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
