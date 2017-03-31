'use strict'

const path = require('path')
const startServer = require('../../../server')

let server = null
const config = {
  db:     { path: 'db.json' },
  logger: { environment: 'production' },
  statsD: { host: 'localhost', port: 8125, prefix: 'jackal' },
  quiet:  true
}

const start = function (options, done) {
  config.db.path = options.dbPath || config.db.path
  server = startServer(config, done)
}

const stop = function (done) {
  server.close(done)
}

module.exports = { start, stop }
