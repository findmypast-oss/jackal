'use strict'

const fs = require('fs')
const request = require('request')
const exec = require('child_process').exec;
const jackal = require('./helpers/jackal')
const provider = require('./helpers/provider')

describe('Program Tests (slow)', function () {
  describe('Send, run, dump and stats', function () {
    describe('Should be successful with defaults', function () {
      before(jackal.start(25863))
      before(provider.start(5001))
      after(jackal.stop)
      after(provider.stop)

      it('Send a contract is successful against 25863', function (done) {
        exec(
          'node index send ./test/program/helpers/contract-v1.json',
          (err, stdout, stderr) => {
            if (err) { return done(err) }
            expect(provider.contractHitCount()).to.be.equal(1)
            done()
          }
        )
      })

      it('Run is successful against 25863', function (done) {
        exec(
          'node index run program',
          (err, stdout, stderr) => {
            if (err) { return done(err) }
            expect(provider.contractHitCount()).to.be.equal(2)
            done()
          }
        )
      })

      it('Dump is successful against 25863', function (done) {
        exec(
          'node index dump',
          (err, stdout, stderr) => {
            if (err) { return done(err) }
            expect(err).to.not.exist
            done()
          }
        )
      })

      it('Stats is successful against 25863', function (done) {
        exec(
          'node index stats -P program',
          (err, stdout, stderr) => {
            if (err) { return done(err) }
            expect(err).to.not.exist
            done()
          }
        )
      })
    })

    describe('Should fail with non-existent contract', function () {
      before(jackal.start(25863))
      before(provider.start(5001))
      after(jackal.stop)
      after(provider.stop)

      it('Send a contract is successful against 25863', function (done) {
        exec(
          'node index send ./test/program/helpers/contract-v3.json --verbose',
          (err, stdout, stderr) => {
            if (err) {
              expect(err).to.exist
              return done()
            } else {
              done(new Error('Should have been an error'))
            }
          }
        )
      })
    })

    describe('Should handle exit code 1 properly', function () {
      before(jackal.start(25863))
      before(provider.start(5001, { version: 'abc' }))
      after(jackal.stop)
      after(provider.stop)

      it('Send a contract is successful against 25863', function (done) {
        exec(
          'node index send ./test/program/helpers/contract-v1.json',
          (err, stdout, stderr) => {
            if (err) {
              expect(err).to.exist
              return done()
            } else {
              done(new Error('Should have been an error'))
            }
          }
        )
      })
    })

    describe('Should be successful from file', function () {
      before(jackal.start(25864))
      before(provider.start(5001))
      after(jackal.stop)
      after(provider.stop)

      it('Send a contract is successful against 25864', function (done) {
        exec(
          'node index send ./test/program/helpers/contract-v1.json -c ./test/program/helpers/jackal-config-25864.json',
          (err, stdout, stderr) => {
            if (err) { return done(err) }
            expect(provider.contractHitCount()).to.be.equal(1)
            done()
          }
        )
      })

      it('Run is successful against 25864', function (done) {
        exec(
          'node index run program -c ./test/program/helpers/jackal-config-25864.json',
          (err, stdout, stderr) => {
            if (err) { return done(err) }
            expect(provider.contractHitCount()).to.be.equal(2)
            done()
          }
        )
      })

      it('Dump is successful against 25864', function (done) {
        exec(
          'node index dump -c ./test/program/helpers/jackal-config-25864.json',
          (err, stdout, stderr) => {
            if (err) { return done(err) }
            expect(err).to.not.exist
            done()
          }
        )
      })

      it('Stats is successful against 25864', function (done) {
        exec(
          'node index stats -P program -c ./test/program/helpers/jackal-config-25864.json',
          (err, stdout, stderr) => {
            if (err) { return done(err) }
            expect(err).to.not.exist
            done()
          }
        )
      })
    })

    describe('Should be successful from command line arguments', function () {
      before(jackal.start(25865))
      before(provider.start(5001))
      after(jackal.stop)
      after(provider.stop)

      it('Send a contract is successful against 25865', function (done) {
        exec(
          'node index send ./test/program/helpers/contract-v1.json -b http://localhost -p 25865',
          (err, stdout, stderr) => {
            if (err) { return done(err) }
            expect(provider.contractHitCount()).to.be.equal(1)
            done()
          }
        )
      })

      it('Send with missing contract file flag skips testing', function (done) {
        exec(
          'node index send ./test/program/helpers/non-existant.json --skip-missing-contract -b http://localhost -p 25865',
          (err, stdout, stderr) => {
            if (err) { return done(err) }
            expect(err).to.not.exist
            expect(provider.contractHitCount()).to.be.equal(1)
            done()
          }
        )
      })

      it('Run is successful against 25865', function (done) {
        exec(
          'node index run program -b http://localhost -p 25865',
          (err, stdout, stderr) => {
            if (err) { return done(err) }
            expect(provider.contractHitCount()).to.be.equal(2)
            done()
          }
        )
      })

      it('Dump is successful against 25865', function (done) {
        exec(
          'node index dump  -b http://localhost -p 25865',
          (err, stdout, stderr) => {
            if (err) { return done(err) }
            expect(err).to.not.exist
            done()
          }
        )
      })

      it('Stats is successful against 25865', function (done) {
        exec(
          'node index stats -P program -b http://localhost -p 25865',
          (err, stdout, stderr) => {
            if (err) { return done(err) }
            expect(err).to.not.exist
            done()
          }
        )
      })
    })

    describe('Should be successful from command line arguments', function () {
      before(jackal.start(25865))
      before(provider.start(5001))
      after(jackal.stop)
      after(provider.stop)

      it('Send a contract is successful against 25865', function (done) {
        exec(
          'node index send ./test/program/helpers/contract-v1.json -b http://localhost -p 25865',
          (err, stdout, stderr) => {
            if (err) { return done(err) }
            expect(provider.contractHitCount()).to.be.equal(1)
            done()
          }
        )
      })

    })
  })
})
