'use strict'

const startServer = require('../../../server')

let server = null
const config = {
  db:     { path: 'db.json' },
  logger: { environment: 'production' },
  statsD: { host: 'localhost', port: 8125, prefix: 'jackal' },
  quiet:  true,
  jackal: { host: 'http://localhost', port: 25863 }
}

const start = function (done) {
  server = startServer(config, done)
}

const stop = function (done) {
  server.close(done)
}

module.exports = { start, stop }
