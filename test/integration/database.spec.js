'use strict'

const fs = require('fs')

const client = require('./support/client')
const jackal = require('./support/jackal')
const provider = require('./support/provider')

describe('Database tests', function () {
  before(function (done) {
    jackal.start({}, done)
  })

  it('The provider should start successfully', function (done){
    provider.start({ port: 5000, contract: { version: '1' } }, done)
  })

  it('Sending contract-v1 the first time should pass', function (done) {
    client.send({
      filePath: 'test/integration/contract-v1.json',
      isPass: true
    }, done)
  })

  it('Running the v1 contract passes because it exists', function (done) {
    client.run({ provider: 'integration', isPass: true }, done)
  })

  it('The database is saved to the local file system', function (done) {
    client.dump({ filePath: 'test/integration/db.json' }, done)
  })

  it('Jackal stops successfully', function (done) {
    jackal.stop(done)
  })

  it('Jackal starts with no contracts', function (done) {
    jackal.start({}, done)
  })

  it('Running the v1 contract fails because it does not exist any more', function (done) {
    client.run({ provider: 'integration', isPass: false }, done)
  })

  it('Jackal stops successfully', function (done) {
    jackal.stop(done)
  })

  it('Jackal starts with the saved database', function (done) {
    jackal.start({
      dbPath: 'test/integration/db.json'
    }, done)
  })

  it('The database dump should match the previously saved file', function (done) {
    const dumpedJson = fs.readFileSync('test/integration/db.json', 'utf8')
    const dumped = JSON.parse(dumpedJson)

    client.dump({ filePath: 'test/integration/new_db.json' }, () => {
      const newDumpedJson = fs.readFileSync('test/integration/db.json', 'utf8')
      const newDumped = JSON.parse(newDumpedJson)

      expect(dumped).to.deep.equal(newDumped)
      done()
    })
  })

  it('Running the v1 contract passes because it exists', function (done) {
    client.run({ provider: 'integration', isPass: true }, done)
  })

  after(function (done) {
    jackal.stop()
    provider.stop()
    fs.unlinkSync('test/integration/db.json')
    fs.unlinkSync('test/integration/new_db.json')
    done()
  })
})
