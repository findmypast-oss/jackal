'use strict'

const fs = require('fs')
const client = require('../../../client')

const send = (options, done) => {
  client.send(options.filePath, {
    jackal: { baseUrl: 'http://localhost', port: 25853 }
  },
  assert(options.isPass, options.message, done) )
}

const run = (options, done) => {
  client.run(options.provider, {
    jackal: { baseUrl: 'http://localhost', port: 25853 }
  },
  assert(options.isPass, options.message, done) )
}

const dump = (options, done) => {
  client.dump({
    jackal: { baseUrl: 'http://localhost', port: 25853 }
  }, (err, json) => {
    if(err) return done(err)
    fs.writeFileSync(options.filePath, json)
    done()
  })
}

const stats = (options, expected, done) => {
  client.stats({
    jackal: { baseUrl: 'http://localhost', port: 25853 },
    stats: options.stats || {}
  }, (err, res) => {
    if (err) { return done(err) }

    expect(res).to.eql(expected)
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

module.exports = { run, send, stats, dump }
