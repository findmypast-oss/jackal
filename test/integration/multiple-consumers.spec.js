'use strict'

const fs = require('fs')
const provider = require('./helpers/provider')
const jackal = require('./helpers/jackal')
const client = require('./helpers/client')
const request = require('request')

describe('Multiple Consumers, One Provider', function () {
  before((done) => {
    if(fs.existsSync('db.json')){
      fs.unlinkSync('db.json')
    }
    done()
  })
  before((done) => jackal.start({}, done))
  after(jackal.stop)
  after(provider.stop)

  it('should be living long and prospering', function (done) {
    request('http://localhost:25863/health', (err, res, body) => {
      expect(res.statusCode).to.be.equal(200)
      expect(body).to.be.equal('😊')
      done()
    })
  })

  it('should start the provider successfully using version: "1"', function (done) {
    provider.start({ port: 5000, contract: { version: 1 } }, done)
  })

  it(`should pass when sending contracts A using json contracts file`, function (done) {
    client.send(
      {
        filePath: 'test/integration/contracts/multiple-consumers-a.json',
        isPass: true,
        resultsCount: 1
      },
      done
    )
  })

  it('should now have hit the provider "/contract-a" 1 time', function () {
    expect(provider.contractHitCount().contractA).to.equal(1)
  })

  it(`should pass when sending contracts B using json contracts file`, function (done) {
    client.send(
      {
        filePath: 'test/integration/contracts/multiple-consumers-b.json',
        isPass: true,
        resultsCount: 1
      },
      done
    )
  })

  it('should now have hit the provider "/contract-a" 1 time', function () {
    expect(provider.contractHitCount().contractB).to.equal(1)
  })

  it(`should pass when sending contracts C using json contracts file`, function (done) {
    client.send(
      {
        filePath: 'test/integration/contracts/multiple-consumers-c.json',
        isPass: true,
        resultsCount: 1
      },
      done
    )
  })

  it('should now have hit the provider "/contract-c" 1 time', function () {
    expect(provider.contractHitCount().contractC).to.equal(1)
  })

  it(`should pass when sending contracts C using json contracts file`, function (done) {
    client.run(
      {
        provider: 'multiConsumerProvider',
        isPass: true,
        resultsCount: 3
      },
      done
    )
  })

  it('should now have hit the provider endpoint 2 times', function () {
    expect(provider.contractHitCount().contractA).to.equal(2)
    expect(provider.contractHitCount().contractB).to.equal(2)
    expect(provider.contractHitCount().contractC).to.equal(2)
  })
})
