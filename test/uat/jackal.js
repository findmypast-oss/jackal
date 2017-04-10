'use strict'

const startServer = require('../../server')

let server = null
const config = {
  db:     { path: 'db.json' },
  jackal: { host: 'http://localhost', port: 25863},
  quiet:  false
}

const start = (done) => {
  server = startServer(config, done)
}

module.exports = { start }
