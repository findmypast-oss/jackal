'use strict'

const fs = require('fs')
const request = require('request')
const spawn = require('child_process').spawn
const jackal = require('./helpers/jackal')
const provider = require('./helpers/provider')

describe('Program Tests', function () {
  before(jackal.start)
  before(provider.start)
  after(jackal.stop)
  after(provider.stop)

  it('Send a contract is successful', function (done) {
    const child = spawn(
      'node',
      [ 'index', 'send', './test/program/helpers/contract-v1.json' ],
      { stdio: 'inherit' }
    )

    child.on('close',  (code, signal) => {
      expect(code).to.be.equal(0)
      expect(provider.contractHitCount()).to.be.equal(1)
      done()
    })
  })

  it('Run is successful', function (done) {
    const child = spawn(
      'node',
      [ 'index', 'run', 'program' ],
      { stdio: 'inherit' }
    )

    child.on('close',  (code, signal) => {
      expect(code).to.be.equal(0)
      expect(provider.contractHitCount()).to.be.equal(2)
      done()
    })
  })
})
