'use strict'

const fs = require('fs')
const exec = require('child_process').exec
const jackal = require('../helpers/jackal')
const Provider = require('../helpers/provider')
const send = require('../../../client/send')

describe.only('CLI.Send Integration Test', function () {
  let providerOne, providerTwo

  before(function (done) {
    providerOne = new Provider()
    providerOne.start({ port: 8379 }, done)
  })

  before(function (done) {
    providerTwo = new Provider()
    providerTwo.start({ port: 8380 }, done)
  })

  after(function (done) { providerOne.stop(done) })
  after(function (done) { providerTwo.stop(done) })

  context('with valid, passing contracts using the json reporter', function () {
    context('using the JSON reporter', function () {
      let port, dbPath, options

      before(function (done) {
        port = 8378
        dbPath = 'test/integration/api/consumer.json'
        options = {
          port: port,
          quiet: true,
          db: { path: dbPath }
        }

        jackal.start(options, done)
      })

      it('should return a list of contract results for the consumer suite', function (done) {
        const expected = [
          { name: 'provider_one/user_api/OK', consumer: 'consumer', status: 'Pass', error: null },
          { name: 'provider_one/receipt_api/OK', consumer: 'consumer', status: 'Pass', error :null },
          { name: 'provider_two/product_api/OK', consumer: 'consumer', status: 'Pass', error :null }
        ]

        exec(`node index send -r json http://localhost:${port} test/integration/contracts/consumer-valid-passing.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist

          const parsed = JSON.parse(stdout)
          const parsedBody = JSON.parse(parsed.body)

          expect(parsed.statusCode).to.equal(201)
          expect(parsedBody).to.eql(expected)
          expect(stderr).to.equal('')

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
  })

  context('with valid, failing contracts', function () {
    context('using the JSON reporter', function () {
      let port, dbPath, options

      before(function (done) {
        port = 8378
        dbPath = 'test/integration/api/consumer.json'
        options = {
          port: port,
          quiet: true,
          db: { path: dbPath }
        }

        jackal.start(options, done)
      })

      it('should return a list of contract results for the consumer suite', function (done) {
        const expected = [
          { name: 'provider_one/user_api/OK', consumer: 'consumer', status: 'Pass', error: null },
          { name: 'provider_one/receipt_api/OK', consumer: 'consumer', status: 'Pass', error: null },
          { name: 'provider_two/product_api/OK', consumer: 'consumer', status: 'Fail', error: 'Error: Contract failed: "description" must be a number' }
        ]

        exec(`node index send -r json http://localhost:${port} test/integration/contracts/consumer-valid-failing.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist

          const parsed = JSON.parse(stdout)
          const parsedBody = JSON.parse(parsed.body)

          expect(parsed.statusCode).to.equal(201)
          expect(parsedBody).to.eql(expected)
          expect(stderr).to.equal('')

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
  })

  context('with invalid contracts - multiple consumers', function () {
    context('using the JSON reporter', function () {
      let port, dbPath, options

      before(function (done) {
        port = 8378
        dbPath = 'test/integration/api/consumer.json'
        options = {
          port: port,
          quiet: true,
          db: { path: dbPath }
        }

        jackal.start(options, done)
      })

      it('should return a message advising a single consumer is required', function (done) {
        exec(`node index send -r json http://localhost:${port} test/integration/contracts/consumer-invalid-multi-consumer.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist

          const parsed = JSON.parse(stdout)
          const parsedBody = JSON.parse(parsed.body)

          expect(parsed.statusCode).to.equal(400)
          expect(parsedBody).to.eql({ message: 'Contract object must contain a single consumer' })
          expect(stderr).to.equal('')

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
  })

  context('with invalid contracts - missing field(s)', function () {
    context('using the JSON reporter', function () {
      let port, dbPath, options

      before(function (done) {
        port = 8378
        dbPath = 'test/integration/api/consumer.json'
        options = {
          port: port,
          quiet: true,
          db: { path: dbPath }
        }

        jackal.start(options, done)
      })

      it('should return a list of contract validations for the consumer suite', function (done) {
        const expected = {
          message: 'One or more contracts are invalid',
          validations: [
            { contract: 'provider_one/user_api/OK <- consumer', errors: null, valid: true },
            { contract: 'provider_one/receipt_api/OK <- consumer', errors: null, valid: true },
            { contract: 'provider_two/product_api/OK <- consumer', errors: [ { message: '"request" is required', name: "ContractValidationError" } ], valid: false }
          ]
        }

        exec(`node index send -r json http://localhost:${port} test/integration/contracts/consumer-invalid-missing-field.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist

          const parsed = JSON.parse(stdout)
          const parsedBody = JSON.parse(parsed.body)

          expect(parsed.statusCode).to.equal(400)
          expect(parsedBody).to.eql(expected)
          expect(stderr).to.equal('')

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
  })

  context('with invalid contracts - malformed joi', function () {
    context('using the JSON reporter', function () {
      let port, dbPath, options

      before(function (done) {
        port = 8378
        dbPath = 'test/integration/api/consumer.json'
        options = {
          port: port,
          quiet: true,
          db: { path: dbPath }
        }

        jackal.start(options, done)
      })

      it('should return a list of contract validations for the consumer suite', function (done) {
        const expected = {
          message: 'One or more contracts are invalid',
          validations: [ { contract: 'provider_two/product_api/OK <- consumer', errors: [ { message: 'Joi string not well formed', name: 'JoiError' } ], valid: false } ]
        }

        exec(`node index send -r json http://localhost:${port} test/integration/contracts/consumer-invalid-malformed-joi.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist

          const parsed = JSON.parse(stdout)
          const parsedBody = JSON.parse(parsed.body)

          expect(parsed.statusCode).to.equal(400)
          expect(parsedBody).to.eql(expected)
          expect(stderr).to.equal('')

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
  })

  context('with invalid contracts - unsupported joi', function () {
    context('using the JSON reporter', function () {
      let port, dbPath, options

      before(function (done) {
        port = 8378
        dbPath = 'test/integration/api/consumer.json'
        options = {
          port: port,
          quiet: true,
          db: { path: dbPath }
        }

        jackal.start(options, done)
      })

      it('should return a list of contract validations for the consumer suite', function (done) {
        const expected = {
          message: 'One or more contracts are invalid',
          validations: [ { contract: 'provider_two/product_api/OK <- consumer', errors: [ { message: 'Joi type not supported', name: 'JoiError' } ], valid: false } ]
        }

        exec(`node index send -r json http://localhost:${port} test/integration/contracts/consumer-invalid-unsupported-joi.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist

          const parsed = JSON.parse(stdout)
          const parsedBody = JSON.parse(parsed.body)

          expect(parsed.statusCode).to.equal(400)
          expect(parsedBody).to.eql(expected)
          expect(stderr).to.equal('')

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
  })

  context('with missing contracts', function () {
    context('using the JSON reporter', function () {
      let port, dbPath, options

      before(function (done) {
        port = 8378
        dbPath = 'test/integration/api/consumer.json'
        options = {
          port: port,
          quiet: true,
          db: { path: dbPath }
        }

        jackal.start(options, done)
      })

      it('should return an error advising the contracts file is missing', function (done) {
        const errMessage = 'Command failed: node index send -r json http://localhost:8378 test/integration/contracts/missing-contracts-file.json\nMissing contract file test/integration/contracts/missing-contracts-file.json\n'

        exec(`node index send -r json http://localhost:${port} test/integration/contracts/missing-contracts-file.json`, (err, stdout, stderr) => {
          expect(err.message).to.equal(errMessage)
          expect(err.code).to.equal(1)
          expect(stdout).to.equal('')
          expect(stderr).to.equal('Missing contract file test/integration/contracts/missing-contracts-file.json\n')

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
  })

  context('with missing contracts with skip missing contracts flag set', function () {
    context('using the JSON reporter', function () {
      let port, dbPath, options

      before(function (done) {
        port = 8378
        dbPath = 'test/integration/api/consumer.json'
        options = {
          port: port,
          quiet: true,
          db: { path: dbPath }
        }

        jackal.start(options, done)
      })

      it('should return a response advising contracts were skipped as the file could not be found', function (done) {
        exec(`node index send -r json http://localhost:${port} test/integration/contracts/missing-contracts-file.json --skip-missing-contract`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(stdout).to.equal('"Skipping no contracts, file not found: test/integration/contracts/missing-contracts-file.json"\n')
          expect(stderr).to.equal('')

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
  })
})
