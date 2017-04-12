'use strict'

const fs = require('fs')
const request = require('request')
const exec = require('child_process').exec;
const jackal = require('./helpers/jackal')
const provider = require('./helpers/provider')

describe.skip('Program Tests (slow)', function () {
  describe('Send, run, dump and stats', function () {
    describe('Should be successful with defaults', function () {
      before(jackal.start(25863))
      before(provider.start(5001))
      after(jackal.stop)
      after(provider.stop)

      it('Send a contract fails when contract does not exist', function (done) {
        exec(
          'node index send http://localhost:25863 ./i-dont-exist.json --reporter json',
          (err, stdout, stderr) => {
            expect(err).to.exist
            done()
          }
        )
      })

      it('Send a contract passes when contract does not exist but skip flag is included', function (done) {
        exec(
          'node index send http://localhost:25863 ./i-dont-exist.json --reporter json --skip-missing-contract',
          (err, stdout, stderr) => {
            expect(err).to.not.exist
            done()
          }
        )
      })

      it('Send a contract fails with validation error', function (done) {
        exec(
          'node index send http://localhost:25863 ./test/program/contracts/contract-fail.json --reporter json',
          (err, stdout, stderr) => {
            expect(err).to.exist
            done()
          }
        )
      })

      it('Send a contract is successful against 25863', function (done) {
        exec(
          'node index send http://localhost:25863 ./test/program/contracts/contract-pass.json --reporter json',
          (err, stdout, stderr) => {
            const result = JSON.parse(stdout)[0]
            expect(result.status === 'Pass')
            done()
          }
        )
      })

      it('The provider should have been hit 2 times', () => {
        expect(provider.contractHitCount()).to.be.equal(2)
      })

      it('Run is successful against 25863 --reporter json', function (done) {
        exec(
          'node index run http://localhost:25863 program --reporter json',
          (err, stdout, stderr) => {
            const result = JSON.parse(stdout)[0]
            expect(result.status === 'Pass')
            done()
          }
        )
      })

      it('The provider should have been hit 3 times', () => {
        expect(provider.contractHitCount()).to.be.equal(3)
      })

      it.skip('Send a contract fails with validation error', function (done) {
        exec(
          'node index send http://localhost:25863 ./test/program/contracts/contract-fail.json --reporter json',
          (err, stdout, stderr) => {
            expect(err).to.exist
            done()
          }
        )
      })

      it.skip('The provider should have been hit 4 times', () => {
        expect(provider.contractHitCount()).to.be.equal(4)
      })

      it.skip('Run is successful against 25863 --reporter json', function (done) {
        exec(
          'node index run http://localhost:25863 program --reporter json',
          (err, stdout, stderr) => {
            const result = JSON.parse(stdout)[0]
            expect(result.status === 'Pass')
            done()
          }
        )
      })

      it.skip('The provider should have been hit 5 times', () => {
        expect(provider.contractHitCount()).to.be.equal(5)
      })

      it('Dump is successful', function (done) {
        exec(
          'node index dump http://localhost:25863 --reporter json',
          (err, stdout, stderr) => {
            expect(err).to.not.exist
            expect(() => JSON.parse(stdout)).to.not.throw
            done()
          }
        )
      })

      it('Stats is successful', function (done) {
        exec(
          'node index stats http://localhost:25863 --reporter json',
          (err, stdout, stderr) => {
            expect(err).to.not.exist
            expect(() => JSON.parse(stdout)).to.not.throw
            done()
          }
        )
      })

      it('Stats is successful for consumer', function (done) {
        exec(
          'node index stats http://localhost:25863 --reporter json --consumer consumer',
          (err, stdout, stderr) => {
            expect(err).to.not.exist
            expect(() => JSON.parse(stdout)).to.not.throw
            done()
          }
        )
      })

      it('Stats is successful for provider', function (done) {
        exec(
          'node index stats http://localhost:25863 --reporter json --provider program',
          (err, stdout, stderr) => {
            expect(err).to.not.exist
            expect(() => JSON.parse(stdout)).to.not.throw
            done()
          }
        )
      })

      it('Stats is successful for provider and consumer', function (done) {
        exec(
          'node index stats http://localhost:25863 --reporter json --consumer consumer --provider program',
          (err, stdout, stderr) => {
            expect(err).to.not.exist
            expect(() => JSON.parse(stdout)).to.not.throw
            done()
          }
        )
      })
    })
  })
})
