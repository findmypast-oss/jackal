'use strict'

const fs = require('fs')
const request = require('request')
const jackal = require('../../helpers/jackal')
const Provider = require('../../helpers/provider')
const run = require('../../../client/run')

describe('Client.Run Integration Test', function () {
  let port, dbPath, options, providerOne, providerTwo, providerThree, providerFour

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
    providerFour = new Provider()
    providerFour.start({ port: 8382 }, done)
  })

  before(function (done) {
    const buf = fs.readFileSync('test/contracts/provider.json')

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

  it('should get a list of contract results for the specified provider', function (done) {
    run(`http://localhost:${port}`, 'provider_one', {}, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)

      const expected = [
        { name: 'provider_one/receipt_api/OK', consumer: 'consumer', status: 'Pass', error: null },
        { name: 'provider_one/user_api/OK', consumer: 'consumer', status: 'Pass', error: null }
      ]

      expect(body).to.eql(expected)
      done()
    })
  })

  it('should get a list of contract results for the specified provider using the specified provider url', function (done) {
    run(`http://localhost:${port}`, 'provider_one', { testUrl: 'http://localhost:8381' }, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)

      const expected = [
        { name: 'provider_one/receipt_api/OK', consumer: 'consumer', status: 'Pass', error: null },
        { name: 'provider_one/user_api/OK', consumer: 'consumer', status: 'Pass', error: null }
      ]

      expect(body).to.eql(expected)
      done()
    })
  })

  it('should get a list of contract results including failures for the specified provider', function (done) {
    run(`http://localhost:${port}`, 'provider_two', {}, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)

      const expected = [
        { name: 'provider_two/product_api/OK', consumer: 'consumer', status: 'Fail', error: 'Error: Contract failed: "description" must be a number' }
      ]

      expect(body).to.eql(expected)
      done()
    })
  })

  it('should get a list of contract results including failures for the specified provider using the specified provider url', function (done) {
    run(`http://localhost:${port}`, 'provider_two', { testUrl: 'http://localhost:8382' }, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)

      const expected = [
        { name: 'provider_two/product_api/OK', consumer: 'consumer', status: 'Fail', error: 'Error: Contract failed: "description" must be a number' }
      ]

      expect(body).to.eql(expected)
      done()
    })
  })

  it('should get a no contracts found message for an unknown provider', function (done) {
    run(`http://localhost:${port}`, 'provider_three', {}, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)

      const expected = { message: 'No contracts exist for provider: provider_three' }

      expect(body).to.eql(expected)
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

  after(function (done) {
    providerOne.stop(done)
  })

  after(function (done) {
    providerTwo.stop(done)
  })

  after(function (done) {
    providerThree.stop(done)
  })

  after(function (done) {
    providerFour.stop(done)
  })
})
