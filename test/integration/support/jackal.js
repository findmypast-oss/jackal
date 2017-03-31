const jackal = require('../../../lib')
var server = null
var config = {
  db:     { path: 'db.json' },
  logger: { environment: 'production' },
  statsD: { host: 'localhost', port: 8125, prefix: 'jackal' }
}

const start = function (options, done) {
  config.db.path = options.dbPath || config.db.path
  server = jackal(config, done)
}

const stop = function (done) {
  server.close(done)
}

module.exports = { start, stop }
