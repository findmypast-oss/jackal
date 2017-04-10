'use strict'

const startServer = require('../../../server')

let server = null
const config = {
  db:     { path: 'db.json' },
  quiet:  true,
  jackal: { port: 25863 }
}

const start = function (options, done) {
  config.db.path = options.dbPath || config.db.path
  server = startServer(config, done)
}

const stop = function (done) {
  server.close(done)
}

module.exports = { start, stop }
