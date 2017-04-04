'use strict'

const provider = require('./helpers/provider')
const jackal = require('./helpers/jackal')
const client = require('./helpers/client')

describe('Happy path tests', function () {
  before((done) => jackal.start({}, done))
  after(jackal.stop)
  after(provider.stop)

  it('should start the provider successfully using version: "1"', function (done) {
    provider.start({ port: 5000, contract: { version: '1' } }, done)
  })

  it('should pass when sending contracts/v1 once', function (done) {
    client.send({ filePath: 'test/integration/contracts/v1.json', isPass: true }, done)
  })

  it('should pass when sending contracts/v1 twice', function (done) {
    client.send({ filePath: 'test/integration/contracts/v1.json', isPass: true }, done)
  })

  it('should pass when sending contracts/v1 thrice', function (done) {
    client.send({ filePath: 'test/integration/contracts/v1.json', isPass: true }, done)
  })

  it('should have hit the provider "/contract" route 3 times', function () {
    expect(provider.contractHitCount()).to.equal(3)
  })

  it('should stop the provider successfully', function (done) {
    provider.stop(done)
  })

  it('should start the provider successfully using version: "abc"', function (done) {
    provider.start({ port: 5000, contract: { version: 'abc' } }, done)
  })

  it('should fail when running the provider "integration" as it still expects contracts/v1 to be honoured', function (done) {
    client.run({ provider: 'integration', isPass: false }, done)
  })

  it('should pass when sending contracts/v2 once', function (done) {
    client.send({ filePath: 'test/integration/contracts/v2.json', isPass: true }, done)
  })

  it('should pass when sending contracts/v2 twice', function (done) {
    client.send({ filePath: 'test/integration/contracts/v2.json', isPass: true }, done)
  })

  it('should pass when sending contracts/v2 thrice', function (done) {
    client.send({ filePath: 'test/integration/contracts/v2.json', isPass: true }, done)
  })

  it('should now have hit the provider "/contract" 4 times', function () {
    expect(provider.contractHitCount()).to.equal(4)
  })
})
