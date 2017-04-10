'use strict'

module.exports = {
  jackal: {
    baseUrl: 'http://localhost',
    port: 25863
  },
  logger: {
    environment: 'production'
  },
  statsD: {
    host: 'localhost',
    port: 8125,
    prefix: 'jackal'
  },
  db: {
    path: 'db.json'
  },
  quiet: false
}
