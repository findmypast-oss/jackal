'use strict'

const startServer = require('../../../server')

let server = null
const config = {
  db:     { path: 'db.json' },
  logger: { environment: 'production' },
  statsD: { host: 'localhost', port: 8125, prefix: 'jackal' },
  quiet:  true,
  jackal: { }
}

const start = (port) => (done) => {
  config.jackal.port = port
  server = startServer(config, done)
}

const stop = (done) => {
  server.close(done)
}

module.exports = { start, stop }
