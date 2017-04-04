'use strict'

const fs = require('fs')

module.exports = (configPath) => {
  if (configPath) {
    const buffer = fs.readFileSync(configPath)

    return JSON.parse(buffer.toString())
  }

  return {
    logger:     { environment: 'production' },
    statsD:     { host: 'localhost', port: 8125, prefix: 'jackal' },
    db:         { path: 'db.json' },
    reporters:  { 'pretty': true, 'teamcity': true }
  }
}
