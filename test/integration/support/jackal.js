'use strict'

const DB = require('../../../lib/db')
const startServer = require('../../../server')

let server = null
const config = {
  db:     { path: 'db.json' },
  logger: { environment: 'production' },
  statsD: { host: 'localhost', port: 8125, prefix: 'jackal' }
}

const start = function (options, done) {
  config.db.path = options.dbPath || config.db.path
  const db = new DB(config.db)
  server = startServer(config, db, done)
}

const stop = function (done) {
  server.close(done)
}

module.exports = { start, stop }
