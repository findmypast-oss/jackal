'use strict'

const fs = require('fs')
const consumer = require('../../../client')

function send(options, done) {
  consumer.send({
    jackalUrl: 'http://localhost:25863/api/contracts',
    contractsPath: options.filePath
  },
  assert(options.isPass, done) )
}

function run(options, done) {
  consumer.run({
    jackalUrl: 'http://localhost:25863/api/contracts/' + options.provider
  },
  assert(options.isPass, done) )
}

function dump(options, done) {
  consumer.dump({
    jackalUrl: 'http://localhost:25863'
  }, (err, json) => {
    if(err) return done(err)
    fs.writeFileSync(options.filePath, json)
    done()
  })
}

function assert(isPass, done) {
  return function(err, results) {
    if(isPass) {
      expect(err).to.not.exist
      expect(results[0].status).to.equal('Pass')
    } else {
      expect(err).to.exist
      if (Array.isArray(results)) {
        expect(results[0].status).to.equal('Fail')
      } else {
        expect(results.message).to.exist
      }
    }
    done()
  }
}

module.exports = { run, send, dump }
