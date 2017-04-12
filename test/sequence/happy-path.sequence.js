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
})
