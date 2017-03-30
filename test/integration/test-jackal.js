const jackal = require('./../../lib')
var server = null
var config = {
  logger: { environment: 'production' },
  statsD: { host: 'localhost', port: 8125, prefix: 'jackal' }
}

const start = function (done) {
  server = jackal(config, done)
}

const stop = function (done) {
  server.close(done)
}

module.exports = { start, stop }
