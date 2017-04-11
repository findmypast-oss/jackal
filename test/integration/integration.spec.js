'use strict'

const fs = require('fs')
const provider = require('./helpers/provider')
const jackal = require('./helpers/jackal')
const client = require('./helpers/client')
const request = require('request')

const assertAllContractResultsPass = (done) => (err, results) => {
  expect(err).to.not.exist
  results.forEach(x => expect(x.status).to.equal('Pass'))
  done()
}

const assertSomeContractResultsFail = (done) => (err, results) => {
  expect(err).to.exist
  expect(results.some(x => x.status === 'Fail')).to.be.true
  done()
}

const assertErrorMessage = (message, done) => (err, results) => {
  expect(results.message).to.equal(message)
  done()
}

const assertStats = (expected, done) => (err, res) => {
  if (err) { return done(err) }
  expect(res).to.be.deep.equal(JSON.stringify(expected))
  done()
}

describe.skip('Integration Tests', function () {
  describe('Happy Path integration tests', function () {
    before((done) => {
      if(fs.existsSync('db.json')){
        fs.unlinkSync('db.json')
      }
      done()
    })
    before((done) => setTimeout(done, 500))
    before((done) => jackal.start({}, done))
    after(jackal.stop)
    after(provider.stop)

    it('should be living long and prospering', function (done) {
      request('http://localhost:25863/api/health', (err, res, body) => {
        expect(res.statusCode).to.be.equal(200)
        expect(body).to.be.equal('😊')
        done()
      })
    })

    it('should start the provider successfully using version: "1"', function (done) {
      provider.start({ port: 5000, contract: { version: 1 } }, done)
    })

    for (let i = 0; i < 3; i++) {
      it(`should pass when sending contracts/v1 using json contracts file, iteration: ${i}`, function (done) {
        client.send(
          { filePath: 'test/integration/contracts/v1.json' },
          assertAllContractResultsPass(done)
        )
      })
    }

    it('should have hit the provider "/contract" route 3 times', function () {
      expect(provider.contractHitCount().contract).to.equal(3)
    })

    it('should stop the provider successfully', function (done) {
      provider.stop(done)
    })

    it('should start the provider successfully using version: "abc"', function (done) {
      provider.start({ port: 5000, contract: { version: 'abc' } }, done)
    })

    it('should fail when running the provider "integration" as it still expects contracts/v1 to be honoured', function (done) {
      client.run(
        { provider: 'integration'},
        assertSomeContractResultsFail(done)
      )
    })

    for (let i = 0; i < 3; i++) {
      it(`should pass when sending contracts/v2 using yaml contracts file, iteration: ${i}`, function (done) {
        client.send(
          { filePath: 'test/integration/contracts/v2.yaml' },
          assertAllContractResultsPass(done)
        )
      })
    }

    it('should allow usage statistics to be requested', function (done) {
      const expected = {
        consumerCount: 1,
        consumers: [ 'consumer' ],
        providerCount: 1,
        providers: [ 'integration' ],
        apiCount: 1,
        contractCount: 1
      }

      client.stats(
        {},
        assertStats(expected, done)
      )
    })

    it('should allow usage statistics to be requested by consumer', function (done) {
      const expected = {
        consumer: 'consumer',
        providerCount: 1,
        providers: [ 'integration' ],
        apiCount: 1,
        contractCount: 1
      }

      client.stats(
        { consumer: 'consumer' },
        assertStats(expected, done)
      )
    })

    it('should allow usage statistics to be requested by provider', function (done) {
      const expected = {
        provider: 'integration',
        consumerCount: 1,
        consumers: [ 'consumer' ],
        apiCount: 1,
        apis: [ 'contract' ],
        contractCount: 1
      }

      client.stats(
        { provider: 'integration' },
        assertStats(expected, done)
      )
    })

    it('should allow usage statistics to be requested by consumer and provider', function (done) {
      const expected = {
        consumer: 'consumer',
        provider: 'integration',
        apiCount: 1,
        apis: [ 'contract' ],
        contractCount: 1
      }

      client.stats(
        { consumer: 'consumer', provider: 'integration' },
        assertStats(expected, done)
      )
    })

    it('should now have hit the provider "/contract" 4 times', function () {
      expect(provider.contractHitCount().contract).to.equal(4)
    })
  })

  describe('Saving and Loading Database', function () {
    before(function (done) {
      jackal.start({}, done)
    })

    after(() => fs.unlinkSync('test/integration/db.json'))
    after(jackal.stop)
    after(provider.stop)

    it('should start the provider successfully using version: "1"', function (done){
      provider.start({ port: 5000, contract: { version: 1 } }, done)
    })

    it('should pass when sending contracts/v1 the first time', function (done) {
      client.send(
        { filePath: 'test/integration/contracts/v1.json' },
        assertAllContractResultsPass(done)
      )
    })

    it('should pass when running provider "integration"', function (done) {
      client.run(
        { provider: 'integration' },
        assertAllContractResultsPass(done)
      )
    })

    it('should save the database to the local file system', function (done) {
      client.dump(
        {},
        (err, json) => {
          if(err) return done(err)
          fs.writeFileSync('test/integration/db.json', json)
          done()
        }
      )
    })

    it('should stop the Jackal instance successfully', function (done) {
      jackal.stop(done)
    })

    it('start a new Jackal instance with no contracts', function (done) {
      jackal.start({}, done)
    })

    it('should fail when running provider "integration" as no contracts have been sent to the new Jackal instance', function (done) {
      client.run(
        { provider: 'integration'},
        assertErrorMessage('No contracts exist for provider: integration', done)
      )
    })

    it('should stop the second Jackal instance successfully', function (done) {
      jackal.stop(done)
    })

    it('should start a new Jackal instance using the saved database', function (done) {
      jackal.start({ dbPath: 'test/integration/db.json' }, done)
    })

    it('should pass when running provider "integration" as contracts for this provider exist in the loaded database', function (done) {
      client.run(
        { provider: 'integration' },
        assertAllContractResultsPass(done)
      )
    })
  })

  describe('Contract Object with 0 Consumers or Multiple Consumers', function () {
    before(function (done) {
      jackal.start({}, done)
    })

    after(jackal.stop)
    after(provider.stop)

    it('should start the provider successfully using version: "1"', function (done) {
      provider.start({ port: 5000, contract: { version: 1 } }, done)
    })

    it('should fail when sending an empty contracts object', function (done) {
      client.send(
        { filePath: 'test/integration/contracts/empty.json' },
        assertErrorMessage('Contract object must contain a single consumer', done)
      )
    })

    it('should fail when sending an empty contracts array', function (done) {
      client.send(
        { filePath: 'test/integration/contracts/multi-consumer.json' },
        assertErrorMessage('Contract object must contain a single consumer', done)
      )
    })
  })

  describe('Contract Object with Missing or Invalid Fields', function () {
    const tests = [
      { description: 'Single Consumer but no Providers', filePath: 'test/integration/contracts/no-providers.json' },
      { description: 'Single Consumer, at least one Provider, but no APIs', filePath: 'test/integration/contracts/no-apis.json' },
      { description: 'Single Consumer, at least one Provider, at least one API, but no Scenarios', filePath: 'test/integration/contracts/no-scenarios.json' },
      { description: 'Missing Request', filePath: 'test/integration/contracts/missing-request.json' },
      { description: 'Invalid Request', filePath: 'test/integration/contracts/invalid-request.json' },
      { description: 'Invalid Request/Url', filePath: 'test/integration/contracts/invalid-url.json' },
      { description: 'Missing Response', filePath: 'test/integration/contracts/missing-response.json' },
      { description: 'Invalid Response', filePath: 'test/integration/contracts/invalid-response.json' },
      { description: 'Invalid Response/StatusCode', filePath: 'test/integration/contracts/invalid-status-code.json' }
    ]

    tests.forEach((t) => {
      describe(t.description, function () {
        before(function (done) {
          jackal.start({}, done)
        })

        before(function (done) {
          provider.start({ port: 5000, contract: { version: 1 } }, done)
        })

        after(jackal.stop)
        after(provider.stop)

        it(`should fail when sending a contracts object with a: ${t.description}`, function (done) {
          client.send(
            { filePath: t.filePath },
            assertErrorMessage('One or more contracts are invalid', done)
          )
        })
      })
    })
  })

  describe('Contract Object with Malformed Response Schema', function () {
    before(function (done) {
      jackal.start({}, done)
    })

    before(function (done) {
      provider.start({ port: 5000, contract: { version: 1 } }, done)
    })

    after(jackal.stop)
    after(provider.stop)

    it('should fail when sending a contracts object with malformed response schema', function (done) {
      client.send(
        { filePath: 'test/integration/contracts/malformed-response.json' },
        assertErrorMessage('Joi string not well formed', done)
      )
    })
  })

  describe('Contract Object with Unsupported Response Schema', function () {
    before(function (done) {
      jackal.start({}, done)
    })

    before(function (done) {
      provider.start({ port: 5000, contract: { version: 1 } }, done)
    })

    after(jackal.stop)
    after(provider.stop)

    it('should fail when sending a contracts object with unsupported response schema', function (done) {
      client.send(
        { filePath: 'test/integration/contracts/unsupported-response.json' },
        assertErrorMessage('Joi type not supported', done)
      )
    })
  })
})
