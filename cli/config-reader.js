'use strict'

const fs = require('fs')
const yaml = require('js-yaml')
const defaultConfig = require('./default-config')

const getConfig = (options) => {
  let config = Object.assign({}, defaultConfig)
  const configPath = options.configPath || './jackal.json'

  if (fs.existsSync(configPath)) {
    const buffer = fs.readFileSync(configPath)

    return configPath.endsWith('json')
      ? Object.assign(config, JSON.parse(buffer.toString()))
      : Object.assign(config, yaml.safeLoad(buffer.toString()))
  }

  return config
}

module.exports = (options) => {
  let config = getConfig(options)

  config.jackal.baseUrl = options.baseUrl || config.jackal.baseUrl || 'http://localhost'
  config.jackal.port = options.port || config.jackal.port || 25863

  if (options.consumer) { config.stats.consumer = options.consumer }
  if (options.provider) { config.stats.provider = options.provider }

  if (options.skipMissingContract) {
    config.skipMissingContract = options.skipMissingContract
  }

  if (options.testUrl) {
    config.provider.testUrl = options.testUrl
  }

  return config
}
