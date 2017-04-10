'use strict'

const fs = require('fs')
const yaml = require('js-yaml')
const defaultConfig = require('./default-config')

const getConfig = (options) => {
  const configPath = options.configPath || './jackal.json'

  if (fs.existsSync(configPath)) {
    const buffer = fs.readFileSync(configPath)

    return configPath.endsWith('json')
      ? JSON.parse(buffer.toString())
      : yaml.safeLoad(buffer.toString())
  }

  return defaultConfig
}

module.exports = (options) => {
  let config = getConfig(options)

  config.jackal.port = options.port || config.jackal.port

  return config
}
