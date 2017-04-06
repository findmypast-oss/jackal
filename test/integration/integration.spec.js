'use strict'

const fs = require('fs')
const provider = require('./helpers/provider')
const jackal = require('./helpers/jackal')
const client = require('./helpers/client')

describe('Integration Tests', function () {
  describe.only('Happy Path', function () {
    before((done) => jackal.start({}, done))
    after(jackal.stop)
    after(provider.stop)

    it('should start the provider successfully using version: "1"', function (done) {
      provider.start({ port: 5000, contract: { version: '1' } }, done)
    })

    for (let i = 0; i < 3; i++) {
      it(`should pass when sending contracts/v1, iteration: ${i}`, function (done) {
        client.send({ filePath: 'test/integration/contracts/v1.json', isPass: true }, done)
      })
    }

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

    for (let i = 0; i < 3; i++) {
      it(`should pass when sending contracts/v2, iteration: ${i}`, function (done) {
        client.send({ filePath: 'test/integration/contracts/v2.json', isPass: true }, done)
      })
    }

    it('should allow usage statistics to be requested', function () {
      const expected = {
        consumerCount: 1,
        consumers: [ 'consumer' ],
        providerCount: 1,
        providers: [ 'integration' ],
        apiCount: 1,
        contractCount: 1
      }

      client.stats({}, expected)
    })

    it('should allow usage statistics to be requested by consumer', function () {
      const expected = {
        consumer: 'consumer',
        providerCount: 1,
        providers: [ 'integration' ],
        apiCount: 1,
        contractCount: 1
      }

      client.stats({ stats: { consumer: 'consumer' } }, expected)
    })

    it('should allow usage statistics to be requested by provider', function () {
      const expected = {
        provider: 'integration',
        consumerCount: 1,
        consumers: [ 'consumer' ],
        apiCount: 1,
        apis: [ 'contract' ],
        contractCount: 1
      }

      client.stats({ stats: { provider: 'integration' } }, expected)
    })

    it('should allow usage statistics to be requested by consumer and provider', function () {
      const expected = {
        consumer: 'consumer',
        provider: 'integration',
        apiCount: 1,
        apis: [ 'contract' ],
        contractCount: 1
      }

      client.stats({ stats: { consumer: 'consumer', provider: 'integration' } }, expected)
    })

    it('should now have hit the provider "/contract" 4 times', function () {
      expect(provider.contractHitCount()).to.equal(4)
    })
  })

  describe('Saving and Loading Database', function () {
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
      client.run({ provider: 'integration', isPass: false, message: 'No contracts exist for provider: integration' }, done)
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

  describe('Contract Object with 0 Consumers or Multiple Consumers', function () {
    before(function (done) {
      jackal.start({}, done)
    })

    it('should start the provider successfully using version: "1"', function (done) {
      provider.start({ port: 5000, contract: { version: '1' } }, done)
    })

    it('should fail when sending an empty contracts object', function (done) {
      client.send({ filePath: 'test/integration/contracts/empty.json', isPass: false, message: 'Contract object must contain a single consumer' }, done)
    })

    it('should fail when sending an empty contracts array', function (done) {
      client.send({ filePath: 'test/integration/contracts/multi-consumer.json', isPass: false, message: 'Contract object must contain a single consumer' }, done)
    })

    after(function (done) {
      jackal.stop()
      provider.stop()
      done()
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
          provider.start({ port: 5000, contract: { version: '1' } }, done)
        })

        it(`should fail when sending a contracts object with a: ${t.description}`, function (done) {
          client.send({ filePath: t.filePath, isPass: false, message: 'One or more contracts are invalid' }, done)
        })

        after(function (done) {
          jackal.stop()
          provider.stop()
          done()
        })
      })
    })
  })

  describe('Contract Object with Malformed Response Schema', function () {
    before(function (done) {
      jackal.start({}, done)
    })

    before(function (done) {
      provider.start({ port: 5000, contract: { version: '1' } }, done)
    })

    it('should fail when sending a contracts object with malformed response schema', function (done) {
      client.send({ filePath: 'test/integration/contracts/malformed-response.json', isPass: false, message: 'Joi string not well formed' }, done)
    })

    after(function (done) {
      jackal.stop()
      provider.stop()
      done()
    })
  })

  describe('Contract Object with Unsupported Response Schema', function () {
    before(function (done) {
      jackal.start({}, done)
    })

    before(function (done) {
      provider.start({ port: 5000, contract: { version: '1' } }, done)
    })

    it('should fail when sending a contracts object with unsupported response schema', function (done) {
      client.send({ filePath: 'test/integration/contracts/unsupported-response.json', isPass: false, message: 'Joi type not supported' }, done)
    })

    after(function (done) {
      jackal.stop()
      provider.stop()
      done()
    })
  })
})
