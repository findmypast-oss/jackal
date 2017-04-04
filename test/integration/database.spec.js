'use strict'

const fs = require('fs')
const client = require('./helpers/client')
const jackal = require('./helpers/jackal')
const provider = require('./helpers/provider')

describe('Database tests', function () {
  before(function (done) {
    jackal.start({}, done)
  })

  it('should start the provider successfully using version: "1"', function (done){
    provider.start({ port: 5000, contract: { version: '1' } }, done)
  })

  it('should pass when sending contracts/v1 the first time', function (done) {
    client.send({
      filePath: 'test/integration/contracts/v1.json',
      isPass: true
    }, done)
  })

  it('should pass when running provider "integration"', function (done) {
    client.run({ provider: 'integration', isPass: true }, done)
  })

  it('should save the database to the local file system', function (done) {
    client.dump({ filePath: 'test/integration/db.json' }, done)
  })

  it('should stop the Jackal instance successfully', function (done) {
    jackal.stop(done)
  })

  it('start a new Jackal instance with no contracts', function (done) {
    jackal.start({}, done)
  })

  it('should fail when running provider "integration" as no contracts have been sent to the new Jackal instance', function (done) {
    client.run({ provider: 'integration', isPass: false }, done)
  })

  it('should stop the second Jackal instance successfully', function (done) {
    jackal.stop(done)
  })

  it('should start a new Jackal instance using the saved database', function (done) {
    jackal.start({
      dbPath: 'test/integration/db.json'
    }, done)
  })

  it('should pass when running provider "integration" as contracts for this provider exist in the loaded database', function (done) {
    client.run({ provider: 'integration', isPass: true }, done)
  })

  after(function (done) {
    jackal.stop()
    provider.stop()
    fs.unlinkSync('test/integration/db.json')
    done()
  })
})
