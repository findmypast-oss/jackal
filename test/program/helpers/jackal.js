'use strict'

const startServer = require('../../../server')

let server = null
const config = {
  db:     { path: 'db.json' },
  jackal: { port: 25863 },
  quiet:  true
}

const start = (port) => (done) => {
  config.jackal.port = port
  server = startServer(config, done)
}

const stop = (done) => {
  server.close(done)
}

module.exports = { start, stop }
