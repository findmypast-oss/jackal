'use strict'

const fs = require('fs')
const exec = require('child_process').exec
const jackal = require('../../helpers/jackal')
const Provider = require('../../helpers/provider')
const send = require('../../../client/send')

describe('CLI.Send Integration Test', function () {
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
        const expected = {
          message: 'All Passed',
          status: 'PASSED',
          results: [
            { name: 'provider_one/user_api/OK', consumer: 'consumer', status: 'Pass', error: null },
            { name: 'provider_one/receipt_api/OK', consumer: 'consumer', status: 'Pass', error :null },
            { name: 'provider_two/product_api/OK', consumer: 'consumer', status: 'Pass', error :null }
          ]
        }

        exec(`node index send -r json http://localhost:${port} test/contracts/consumer-valid-passing.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(JSON.parse(stdout)).to.eql(expected)
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

    context('using the spec reporter', function () {
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
        const expected = 'provider_one contracts executed\n  consumer contracts executed against provider_one\n    ✔ Test user_api-OK passed for consumer against provider_one\n    ✔ Test receipt_api-OK passed for consumer against provider_one\nprovider_two contracts executed\n  consumer contracts executed against provider_two\n    ✔ Test product_api-OK passed for consumer against provider_two\n'

        exec(`node index send -r spec http://localhost:${port} test/contracts/consumer-valid-passing.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(stdout).to.equal(expected)
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

    context('using the teamcity reporter', function () {
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
        const expected = '##teamcity[testSuiteStarted name=\'provider_one-contracts\']\n##teamcity[testSuiteStarted name=\'consumer-contracts-executed-against-provider_one\']\n##teamcity[testStarted name=\'consumer.user_api.OK\']\n##teamcity[testFinished name=\'consumer.user_api.OK\']\n##teamcity[testStarted name=\'consumer.receipt_api.OK\']\n##teamcity[testFinished name=\'consumer.receipt_api.OK\']\n##teamcity[testStarted name=\'consumer.product_api.OK\']\n##teamcity[testFinished name=\'consumer.product_api.OK\']\n##teamcity[testSuiteEnded name=\'consumer-contracts-executed-against-provider_one\']\n##teamcity[testSuiteEnded name=\'provider_one-contracts\']\n'

        exec(`node index send -r teamcity http://localhost:${port} test/contracts/consumer-valid-passing.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(stdout).to.equal(expected)
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
        const expected = {
          message: 'Failures Exist',
          status: 'FAILED',
          results: [
            { name: 'provider_one/user_api/OK', consumer: 'consumer', status: 'Pass', error: null },
            { name: 'provider_one/receipt_api/OK', consumer: 'consumer', status: 'Pass', error: null },
            { name: 'provider_two/product_api/OK', consumer: 'consumer', status: 'Fail', error: 'Error: Contract failed: "description" must be a number' }
          ]
        }

        exec(`node index send -r json http://localhost:${port} test/contracts/consumer-valid-failing.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(JSON.parse(stdout)).to.eql(expected)
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

    context('using the spec reporter', function () {
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
        const expected = 'Failures Exist\nprovider_one contracts executed\n  consumer contracts executed against provider_one\n    ✔ Test user_api-OK passed for consumer against provider_one\n    ✔ Test receipt_api-OK passed for consumer against provider_one\nprovider_two contracts executed\n  consumer contracts executed against provider_two\n    ✖ Test product_api-OK failed for consumer against provider_two\n    Error: Contract failed: "description" must be a number\n'

        exec(`node index send -r spec http://localhost:${port} test/contracts/consumer-valid-failing.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(stdout).to.eql(expected)
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

    context('using the teamcity reporter', function () {
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
        const expected = '##teamcity[testSuiteStarted name=\'provider_one-contracts\']\n##teamcity[testSuiteStarted name=\'consumer-contracts-executed-against-provider_one\']\n##teamcity[testStarted name=\'consumer.user_api.OK\']\n##teamcity[testFinished name=\'consumer.user_api.OK\']\n##teamcity[testStarted name=\'consumer.receipt_api.OK\']\n##teamcity[testFinished name=\'consumer.receipt_api.OK\']\n##teamcity[testStarted name=\'consumer.product_api.OK\']\n##teamcity[testFailed name=\'consumer.product_api.OK\' message=\'Test failed for consumer\' details=\'Error: Contract failed: "description" must be a number\']\n##teamcity[testFinished name=\'consumer.product_api.OK\']\n##teamcity[testSuiteEnded name=\'consumer-contracts-executed-against-provider_one\']\n##teamcity[testSuiteEnded name=\'provider_one-contracts\']\n'

        exec(`node index send -r teamcity http://localhost:${port} test/contracts/consumer-valid-failing.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(stdout).to.eql(expected)
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
        const expected = {
          message: 'Contract object must contain a single consumer',
          status: 'INVALID',
          results: []
        }

        exec(`node index send -r json http://localhost:${port} test/contracts/consumer-invalid-multi-consumer.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(JSON.parse(stdout)).to.eql(expected)
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

    context('using the spec reporter', function () {
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
        exec(`node index send -r spec http://localhost:${port} test/contracts/consumer-invalid-multi-consumer.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(stdout).to.eql('Contract object must contain a single consumer\n')
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

    context('using the teamcity reporter', function () {
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
        exec(`node index send -r teamcity http://localhost:${port} test/contracts/consumer-invalid-multi-consumer.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(stdout).to.eql('Contract object must contain a single consumer\n[]\n')
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
          status: 'INVALID',
          results: [
            { contract: 'provider_one/user_api/OK <- consumer', errors: null, valid: true },
            { contract: 'provider_one/receipt_api/OK <- consumer', errors: null, valid: true },
            { contract: 'provider_two/product_api/OK <- consumer', errors: [ { message: '"request" is required', name: "ContractValidationError" } ], valid: false }
          ]
        }

        exec(`node index send -r json http://localhost:${port} test/contracts/consumer-invalid-missing-field.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(JSON.parse(stdout)).to.eql(expected)
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

    context('using the spec reporter', function () {
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
        const expected = 'One or more contracts are invalid\n    ✔ provider_one/user_api/OK <- consumer is valid\n    ✔ provider_one/receipt_api/OK <- consumer is valid\n    ✖ provider_two/product_api/OK <- consumer is invalid: \n        - ContractValidationError: "request" is required\n'

        exec(`node index send -r spec http://localhost:${port} test/contracts/consumer-invalid-missing-field.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(stdout).to.eql(expected)
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

    context('using the teamcity reporter', function () {
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
        const expected = 'One or more contracts are invalid\n[{"contract":"provider_one/user_api/OK <- consumer","valid":true,"errors":null},{"contract":"provider_one/receipt_api/OK <- consumer","valid":true,"errors":null},{"contract":"provider_two/product_api/OK <- consumer","valid":false,"errors":[{"name":"ContractValidationError","message":"\\"request\\" is required"}]}]\n'

        exec(`node index send -r teamcity http://localhost:${port} test/contracts/consumer-invalid-missing-field.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(stdout).to.eql(expected)
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
          status: 'INVALID',
          results: [ { contract: 'provider_two/product_api/OK <- consumer', errors: [ { message: 'Joi string not well formed', name: 'JoiError' } ], valid: false } ]
        }

        exec(`node index send -r json http://localhost:${port} test/contracts/consumer-invalid-malformed-joi.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(JSON.parse(stdout)).to.eql(expected)
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

    context('using the spec reporter', function () {
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
        const expected = 'One or more contracts are invalid\n    ✖ provider_two/product_api/OK <- consumer is invalid: \n        - JoiError: Joi string not well formed\n'

        exec(`node index send -r spec http://localhost:${port} test/contracts/consumer-invalid-malformed-joi.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(stdout).to.eql(expected)
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

    context('using the teamcity reporter', function () {
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
        const expected = 'One or more contracts are invalid\n[{"contract":"provider_two/product_api/OK <- consumer","valid":false,"errors":[{"name":"JoiError","message":"Joi string not well formed"}]}]\n'

        exec(`node index send -r teamcity http://localhost:${port} test/contracts/consumer-invalid-malformed-joi.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(stdout).to.eql(expected)
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
          status: 'INVALID',
          results: [ { contract: 'provider_two/product_api/OK <- consumer', errors: [ { message: 'Joi type not supported', name: 'JoiError' } ], valid: false } ]
        }

        exec(`node index send -r json http://localhost:${port} test/contracts/consumer-invalid-unsupported-joi.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(JSON.parse(stdout)).to.eql(expected)
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

    context('using the spec reporter', function () {
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
        const expected = 'One or more contracts are invalid\n    ✖ provider_two/product_api/OK <- consumer is invalid: \n        - JoiError: Joi type not supported\n'

        exec(`node index send -r spec http://localhost:${port} test/contracts/consumer-invalid-unsupported-joi.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(stdout).to.eql(expected)
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

    context('using the teamcity reporter', function () {
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
        const expected = 'One or more contracts are invalid\n[{"contract":"provider_two/product_api/OK <- consumer","valid":false,"errors":[{"name":"JoiError","message":"Joi type not supported"}]}]\n'

        exec(`node index send -r teamcity http://localhost:${port} test/contracts/consumer-invalid-unsupported-joi.json`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(stdout).to.eql(expected)
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
    const stderrOutput = '  \u001b[0m\u001b[97m\u001b[41mError\u001b[0m\u001b[90m:\u001b[0m\u001b[37m \u001b[0m\u001b[97mMissing contract file test/contracts/missing-contracts-file.json\u001b[0m\n\u001b[0m\n'

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
        const errMessage = 'Command failed: node index send -r json http://localhost:8378 test/contracts/missing-contracts-file.json\n  \u001b[0m\u001b[97m\u001b[41mError\u001b[0m\u001b[90m:\u001b[0m\u001b[37m \u001b[0m\u001b[97mMissing contract file test/contracts/missing-contracts-file.json\u001b[0m\n\u001b[0m\n'

        exec(`node index send -r json http://localhost:${port} test/contracts/missing-contracts-file.json`, (err, stdout, stderr) => {
          expect(err.message).to.equal(errMessage)
          expect(err.code).to.equal(1)
          expect(stdout).to.equal('')
          expect(stderr).to.equal(stderrOutput)

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

    context('using the spec reporter', function () {
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
        const errMessage = 'Command failed: node index send -r spec http://localhost:8378 test/contracts/missing-contracts-file.json\n  \u001b[0m\u001b[97m\u001b[41mError\u001b[0m\u001b[90m:\u001b[0m\u001b[37m \u001b[0m\u001b[97mMissing contract file test/contracts/missing-contracts-file.json\u001b[0m\n\u001b[0m\n'

        exec(`node index send -r spec http://localhost:${port} test/contracts/missing-contracts-file.json`, (err, stdout, stderr) => {
          expect(err.message).to.equal(errMessage)
          expect(err.code).to.equal(1)
          expect(stdout).to.equal('')
          expect(stderr).to.equal(stderrOutput)

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

    context('using the teamcity reporter', function () {
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
        const errMessage = 'Command failed: node index send -r teamcity http://localhost:8378 test/contracts/missing-contracts-file.json\n  \u001b[0m\u001b[97m\u001b[41mError\u001b[0m\u001b[90m:\u001b[0m\u001b[37m \u001b[0m\u001b[97mMissing contract file test/contracts/missing-contracts-file.json\u001b[0m\n\u001b[0m\n'

        exec(`node index send -r teamcity http://localhost:${port} test/contracts/missing-contracts-file.json`, (err, stdout, stderr) => {
          expect(err.message).to.equal(errMessage)
          expect(err.code).to.equal(1)
          expect(stdout).to.equal('')
          expect(stderr).to.equal(stderrOutput)

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
        const expected = '{"message":"Skipping no contracts, file not found: test/contracts/missing-contracts-file.json","status":"SKIPPED","results":[]}\n'

        exec(`node index send -r json http://localhost:${port} test/contracts/missing-contracts-file.json --skip-missing-contract`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(stdout).to.equal(expected)
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

    context('using the spec reporter', function () {
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
        exec(`node index send -r spec http://localhost:${port} test/contracts/missing-contracts-file.json --skip-missing-contract`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(stdout).to.equal('Skipping no contracts, file not found: test/contracts/missing-contracts-file.json\n')
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

    context('using the teamcity reporter', function () {
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
        const expected = 'Skipping no contracts, file not found: test/contracts/missing-contracts-file.json\n'

        exec(`node index send -r teamcity http://localhost:${port} test/contracts/missing-contracts-file.json --skip-missing-contract`, (err, stdout, stderr) => {
          expect(err).to.not.exist
          expect(stdout).to.equal(expected)
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
