'use strict'

const fs = require('fs')

const defaultConfig = {
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
  reporters:  {
    'pretty': true,
    'teamcity': true
  },
  jackal: {
    host: 'http://localhost',
    port: 25863
  },
  quiet: false
}

module.exports = (options) => {
  const configPath = options.configPath || './jackal.json'

  if (fs.existsSync(configPath)) {
    const buffer = fs.readFileSync(configPath)
    return JSON.parse(buffer.toString())
  }

  return defaultConfig()
}
