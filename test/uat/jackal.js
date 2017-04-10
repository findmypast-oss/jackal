'use strict'

const startServer = require('../../server')

let server = null
const config = {
  db:     { path: 'db.json' },
  logger: { environment: 'production' },
  statsD: { host: 'localhost', port: 8125, prefix: 'jackal' },
  jackal: { host: 'http://localhost', port: 25863},
  quiet:  false
}

const start = (done) => {
  server = startServer(config, done)
}

module.exports = { start }
