const Promise = require('bluebird')
const jackal = require('./../../lib')
var server = null
var config = {
  logger: { environment: 'production' },
  statsD: { host: 'localhost', port: 8125, prefix: 'jackal' }
}

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
