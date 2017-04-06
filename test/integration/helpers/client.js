'use strict'

const fs = require('fs')
const consumer = require('../../../client')

const send = (options, done) => {
  consumer.send(options.filePath, {
    jackal: { baseUrl: 'http://localhost', port: 25853}
  },
  assert(options.isPass, options.message, done) )
}

const run = (options, done) => {
  consumer.run(options.provider, {
    jackal: { baseUrl: 'http://localhost', port: 25853}
  },
  assert(options.isPass, options.message, done) )
}

const dump = (options, done) => {
  consumer.dump({
    jackal: { baseUrl: 'http://localhost', port: 25853}
  }, (err, json) => {
    if(err) return done(err)
    fs.writeFileSync(options.filePath, json)
    done()
  })
}

const assert = (isPass, message, done) => (err, results) => {
  if(isPass) {
    expect(err).to.not.exist
    expect(results[0].name).to.equal('integration/contract/OK')
    expect(results[0].consumer).to.equal('consumer')
    expect(results[0].status).to.equal('Pass')
  } else {
    if (Array.isArray(results)) {
      expect(results[0].status).to.equal('Fail')
    } else {
      expect(results.message).to.equal(message)
    }
  }
  done()
}

module.exports = { run, send, dump }
