'use strict'

const fs = require('fs')
const provider = require('./helpers/provider')
const jackal = require('./helpers/jackal')
const client = require('./helpers/client')
const request = require('request')

const assertAllContractResultsPassWithCount = (count, done) => (err, results) => {
  expect(err).to.not.exist
  results.forEach(x => expect(x.status).to.equal('Pass'))
  done()
}

describe('Multiple Consumers, One Provider', function () {
  before((done) => jackal.start({}, done))
  after(jackal.stop)
  after(provider.stop)

  it('should start the provider successfully using version: "1"', function (done) {
    provider.start({ port: 5000, contract: { version: 1 } }, done)
  })

  it(`should pass when sending contracts A using json contracts file`, function (done) {
    client.send(
      { filePath: 'test/integration/contracts/multiple-consumers-a.json' },
      assertAllContractResultsPassWithCount(1, done)
    )
  })

  it('should now have hit the provider "/contract-a" 1 time', function () {
    expect(provider.contractHitCount().contractA).to.equal(1)
  })

  it(`should pass when sending contracts B using json contracts file`, function (done) {
    client.send(
      { filePath: 'test/integration/contracts/multiple-consumers-b.json' },
      assertAllContractResultsPassWithCount(1, done)
    )
  })

  it('should now have hit the provider "/contract-b" 1 time', function () {
    expect(provider.contractHitCount().contractB).to.equal(1)
  })

  it(`should pass when sending contracts C using json contracts file`, function (done) {
    client.send(
      { filePath: 'test/integration/contracts/multiple-consumers-c.json' },
      assertAllContractResultsPassWithCount(1, done)
    )
  })

  it('should now have hit the provider "/contract-c" 1 time', function () {
    expect(provider.contractHitCount().contractC).to.equal(1)
  })

  it('should pass when running against multiConsumerProvider with 3 results', function (done) {
    client.run(
      { provider: 'multiConsumerProvider'},
      assertAllContractResultsPassWithCount(3, done)
    )
  })

  it('should now have hit the provider endpoint 2 times', function () {
    expect(provider.contractHitCount().contractA).to.equal(2)
    expect(provider.contractHitCount().contractB).to.equal(2)
    expect(provider.contractHitCount().contractC).to.equal(2)
  })

  it('should pass when running against multiConsumerProvider with 3 results', function (done) {
    client.run(
      { provider: 'multiConsumerProvider'},
      assertAllContractResultsPassWithCount(3, done)
    )
  })

  it('should now have hit the provider endpoint 3 times', function () {
    expect(provider.contractHitCount().contractA).to.equal(3)
    expect(provider.contractHitCount().contractB).to.equal(3)
    expect(provider.contractHitCount().contractC).to.equal(3)
  })
})
