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

  it('Jackal is up and running', function (done) {
    request('http://localhost:25863/health', (err, res) => {
      expect(res.statusCode).to.be.equal(200)
      done()
    })
  })

  it('Provider is up and running', function (done) {
    request('http://localhost:5000/contract', (err, res) => {
      expect(res.statusCode).to.be.equal(200)
      done()
    })
  })

  it('Send is successful', function () {
    const result = spawnSync('node',
      [
        'index',
        'send',
        './test/program/contracts/v1.json'
      ]
    )

    expect(result.status).to.be.equal(0)
    expect(provider.contractHitCount()).to.be.equal(1)
  })

  // it('Run manual', function (done) {
  //   request('http://localhost:25863/api/contracts/program', (err, res) => {
  //     expect(res.statusCode).to.be.equal(200)
  //     expect(provider.contractHitCount()).to.be.equal(2)
  //     expect(err).to.not.exist
  //     done()
  //   })
  // })
  //
  // it('Run is successful', function () {
  //   const result = spawnSync('node',
  //     [
  //       'index',
  //       'run',
  //       'program',
  //       '-p', '25863',
  //       '-b', 'http://localhost',
  //       '-v',
  //     ]
  //   )
  //
  //   console.log(result.stdout.toString());
  //   console.log(result.stderr.toString());
  //
  //   expect(result.status).to.be.equal(0)
  //   expect(provider.contractHitCount()).to.be.equal(2)
  // })

})
