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
          'node index send http://localhost:25863 ./test/program/contracts/contract-v1.json --reporter json',
          (err, stdout, stderr) => {
            if (err) { return done(err) }
            expect(provider.contractHitCount()).to.be.equal(1)
            // const result = JSON.parse(stdout)[0]
            // expect(result.status === 'Pass')
            done()
          }
        )
      })

      it('Run is successful against 25863 --reporter json', function (done) {
        exec(
          'node index run http://localhost:25863 program --reporter json',
          (err, stdout, stderr) => {
            if (err) { return done(err) }
            expect(provider.contractHitCount()).to.be.equal(2)
            // const result = JSON.parse(stdout)[0]
            // expect(result.status === 'Pass')
            done()
          }
        )
      })

      it('Dump is successful against 25863', function (done) {
        exec(
          'node index dump http://localhost:25863',
          (err, stdout, stderr) => {
            if (err) { return done(err) }
            expect(err).to.not.exist
            done()
          }
        )
      })

      it('Stats is successful against 25863', function (done) {
        exec(
          'node index stats http://localhost:25863 --provider program',
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
          'node index send http://localhost:25863 ./test/program/helpers/contract-v3.json',
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
          'node index send http://localhost:25863 ./test/program/helpers/contract-v1.json',
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
  })
})
