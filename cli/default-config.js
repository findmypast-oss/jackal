'use strict'

module.exports = {
  db: {
    path: 'db.json'
  },
  jackal: {
    baseUrl: 'http://localhost',
    port: 25863
  },
  logger: {
    environment: 'production'
  },
  provider: {},
  reporters:  {
    'pretty': true,
    'teamcity': false
  },
  stats: {},
  statsD: {
    host: 'localhost',
    port: 8125,
    prefix: 'jackal'
  },
  quiet: false
}
