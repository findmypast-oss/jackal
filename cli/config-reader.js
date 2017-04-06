'use strict'

const fs = require('fs')

const defaultConfig = {
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
  reporters:  {
    'pretty': true,
    'teamcity': false
  },
  quiet: false
}

const getConfig = (options) => {
  const configPath = options.configPath || './jackal.json'

  if (fs.existsSync(configPath)) {
    const buffer = fs.readFileSync(configPath)
    return JSON.parse(buffer.toString())
  }

  return defaultConfig
}

module.exports = (options) => {
  let config = getConfig(options)

  config.jackal.baseUrl = options.baseUrl || config.jackal.baseUrl
  config.jackal.port = options.port || config.jackal.port

  return config
}
