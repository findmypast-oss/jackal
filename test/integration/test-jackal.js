const jackal = Promise.promisify(require('./../../lib'))

const Promise = require('bluebird')
var server = null
var config = {}

const start = (done) => {
  server = jackal(config, done)
}

const stop = (done) => {
  server.close(done)
}

module.exports = {
  start: Promise.promisify(start),
  stop: Promise.promisify(stop)
}
