'use strict'

const fs = require('fs')
const request = require('request')
const jackal = require('./helpers-v2/jackal')

describe('Health Endpoint Integration Test', function () {
  let port, dbPath, options

  before(function (done) {
    port = 8378
    dbPath = 'test/integration/api/health.json'
    options = {
      port: port,
      quiet: true,
      db: { path: dbPath }
    }

    jackal.start(options, done)
  })

  it('should have an accessible health endpoint', function (done) {
    request(`http://localhost:${port}/api/health`, (err, res, body) => {
      expect(err).to.be.null
      expect(res.statusCode).to.equal(200)
      expect(body).to.equal('😊')
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
