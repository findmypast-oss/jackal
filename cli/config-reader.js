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

  config.jackal.baseUrl = options.baseUrl || config.jackal.baseUrl
  config.jackal.port = options.port || config.jackal.port

  config.stats = {}
  if (options.consumer) { config.stats.consumer = options.consumer }
  if (options.provider) { config.stats.provider = options.provider }

  if(options.skipMissingContract){
    config.skipMissingContract = options.skipMissingContract
  }

  return config
}
