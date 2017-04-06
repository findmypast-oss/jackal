'use strict'

const fs = require('fs')
const request = require('request')
const execSync = require('child_process').execSync;
const spawnSync = require('child_process').spawnSync;
const jackal = require('./helpers/jackal')
const provider = require('./helpers/provider')

describe('Program Tests', function () {
  before((done) => jackal.start({}, done))
  before((done) => provider.start({ port: 5000, contract: { version: '1' } }, done))
  after(jackal.stop)
  after(provider.stop)

  describe('Send command', function () {

    it('xyz12', function (done) {
      request('http://localhost:25863/api/health', done)
    })

    xit('xyz', function () {
      const result = spawnSync("node", ['index', 'send', './test/program/contracts/v1.json'])

      console.log(result.status);
      console.log('hit count', provider.contractHitCount());
      console.log('stdout', result.stdout.toString());
      console.log('stderr', result.stderr.toString());
      expect(result).to.be.equal("")
    })
  })
})
