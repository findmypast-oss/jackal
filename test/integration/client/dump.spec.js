'use strict'

const fs = require('fs')
const request = require('request')
const jackal = require('../../helpers/jackal')
const Provider = require('../../helpers/provider')
const dump = require('../../../client/dump')

describe('Client.Dump Integration Test', function () {
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

  before(function (done) {
    const buf = fs.readFileSync('test/contracts/stats.json')

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

  it('should get an up to date copy of the database serialised as JSON', function (done) {
    dump(`http://localhost:${port}`, (err, res, body) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)
      expect(body).to.be.an('object')
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
})
