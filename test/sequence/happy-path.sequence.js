'use strict'

const fs = require('fs')
const send = require('../../client/send')
const run = require('../../client/run')
const stats = require('../../client/stats')
const dump = require('../../client/dump')
const jackal = require('../helpers/jackal')
const Provider = require('../helpers/provider')

describe('Happy Path Sequence Test', function () {
  let port, dbPath, options, providerOne, providerTwo

  before(function (done) {
    port = 8378
    dbPath = 'test/integration/api/db.json'
    options = {
      port: port,
      quiet: true,
      db: { path: dbPath }
    }

    jackal.start(options, done)
  })

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

  after(jackal.stop)

  after(function (done) {
    providerOne.stop(done)
  })

  after(function (done) {
    providerTwo.stop(done)
  })

  it('should error trying to send non existent contracts from the first consumer to jackal', function (done) {
    send(`http://localhost:${port}`, 'test/contracts/missing-contracts-file.json', {}, (err, res, body) => {
      expect(err).to.equal('Missing contract file test/contracts/missing-contracts-file.json')
      expect(res).to.not.exist
      expect(body).to.not.exist
      done()
    })
  })

  it('should exit gracefully trying to send non existent contracts from the first consumer to jackal with the skip flag set', function (done) {
    send(`http://localhost:${port}`, 'test/contracts/missing-contracts-file.json', { skipMissingContract: true }, (err, res, body) => {
      expect(err).to.not.exist
      expect(res).to.equal('Skipping no contracts, file not found: test/contracts/missing-contracts-file.json')
      expect(body).to.not.exist
      done()
    })
  })

  it('should send invalid contracts from the first consumer to jackal and return the response', function (done) {
    const expected = {
      message: 'One or more contracts are invalid',
      validations: [
        { contract: 'provider_one/user_api/OK <- consumer', valid: true, errors: null },
        { contract: 'provider_one/receipt_api/OK <- consumer', valid: true, errors: null },
        { contract: 'provider_two/product_api/OK <- consumer', valid: false, errors: [ { name: 'ContractValidationError', message: '"request" is required' } ] }
      ]
    }

    send(`http://localhost:${port}`, 'test/contracts/consumer-invalid-missing-field.json', {}, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(400)
      expect(body).to.eql(expected)
      done()
    })
  })

  it('should show no contracts currently in the jackal database', function (done) {
    const expected = { apiCount: 0, consumerCount: 0, consumers: [], contractCount: 0, providerCount: 0, providers: [] }

    stats(`http://localhost:${port}`, {}, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)
      expect(body).to.eql(expected)
      done()
    })
  })

  it('should send valid, failing contracts from the first consumer to jackal and return the response', function (done) {
    const expected = [
      { name: 'provider_one/user_api/OK', consumer: 'consumer', status: 'Pass', error: null },
      { name: 'provider_one/receipt_api/OK', consumer: 'consumer', status: 'Pass', error: null },
      { name: 'provider_two/product_api/OK', consumer: 'consumer', status: 'Fail', error: 'Error: Contract failed: "description" must be a number' }
    ]

    send(`http://localhost:${port}`, 'test/contracts/consumer-valid-failing.json', {}, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(201)
      expect(body).to.eql(expected)
      done()
    })
  })

  it('should show three contracts currently in the jackal database', function (done) {
    const expected = { apiCount: 3, consumerCount: 1, consumers: [ 'consumer' ], contractCount: 3, providerCount: 2, providers: [ 'provider_one', 'provider_two' ] }

    stats(`http://localhost:${port}`, {}, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)
      expect(body).to.eql(expected)
      done()
    })
  })

  it('should run the passing provider successfully and return the response', function (done) {
    const expected = [
      { name: 'provider_one/receipt_api/OK', consumer: 'consumer', status: 'Pass', error: null },
      { name: 'provider_one/user_api/OK', consumer: 'consumer', status: 'Pass', error: null }
    ]

    run(`http://localhost:${port}`, 'provider_one', {}, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)
      expect(body).to.eql(expected)
      done()
    })
  })

  it('should run the failing provider and return the response', function (done) {
    const expected = [
      { name: 'provider_two/product_api/OK', consumer: 'consumer', status: 'Fail', error: 'Error: Contract failed: "description" must be a number' }
    ]

    run(`http://localhost:${port}`, 'provider_two', {}, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)
      expect(body).to.eql(expected)
      done()
    })
  })

  it('should send valid, passing contracts from the first consumer to jackal and return the response', function (done) {
    const expected = [
      { name: 'provider_one/user_api/OK', consumer: 'consumer', status: 'Pass', error: null },
      { name: 'provider_one/receipt_api/OK', consumer: 'consumer', status: 'Pass', error: null },
      { name: 'provider_two/product_api/OK', consumer: 'consumer', status: 'Pass', error: null }
    ]

    send(`http://localhost:${port}`, 'test/contracts/consumer-valid-passing.json', {}, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(201)
      expect(body).to.eql(expected)
      done()
    })
  })

  it('should show three contracts currently in the jackal database', function (done) {
    const expected = { apiCount: 3, consumerCount: 1, consumers: [ 'consumer' ], contractCount: 3, providerCount: 2, providers: [ 'provider_one', 'provider_two' ] }

    stats(`http://localhost:${port}`, {}, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)
      expect(body).to.eql(expected)
      done()
    })
  })

  it('should run the passing provider successfully and return the response', function (done) {
    const expected = [
      { name: 'provider_one/receipt_api/OK', consumer: 'consumer', status: 'Pass', error: null },
      { name: 'provider_one/user_api/OK', consumer: 'consumer', status: 'Pass', error: null }
    ]

    run(`http://localhost:${port}`, 'provider_one', {}, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)
      expect(body).to.eql(expected)
      done()
    })
  })

  it('should run the second passing provider successfully and return the response', function (done) {
    const expected = [
      { name: 'provider_two/product_api/OK', consumer: 'consumer', status: 'Pass', error: null }
    ]

    run(`http://localhost:${port}`, 'provider_two', {}, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)
      expect(body).to.eql(expected)
      done()
    })
  })

  it('should get stats for the consumer', function (done) {
    const expected = { apiCount: 3, consumer: 'consumer', contractCount: 3, providerCount: 2, providers: [ 'provider_one', 'provider_two' ] }

    stats(`http://localhost:${port}`, { consumer: 'consumer' }, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)
      expect(body).to.eql(expected)
      done()
    })
  })

  it('should get stats for the first provider', function (done) {
    const expected = { apiCount: 2, apis: [ 'receipt_api', 'user_api' ], consumerCount: 1, consumers: [ 'consumer' ], contractCount: 2, provider: 'provider_one' }

    stats(`http://localhost:${port}`, { provider: 'provider_one' }, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)
      expect(body).to.eql(expected)
      done()
    })
  })

  it('should get stats for the second provider', function (done) {
    const expected = { apiCount: 1, apis: [ 'product_api' ], consumerCount: 1, consumers: [ 'consumer' ], contractCount: 1, provider: 'provider_two' }

    stats(`http://localhost:${port}`, { provider: 'provider_two' }, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)
      expect(body).to.eql(expected)
      done()
    })
  })

  it('should dump the database', function (done) {
    dump(`http://localhost:${port}`, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)
      expect(body).to.be.an('object')
      done()
    })
  })
})
