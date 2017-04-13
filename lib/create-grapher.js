'use strict'

const StatsD = require('hot-shots')

const defaultConfig = {
  host: 'localhost',
  port: 8125,
  prefix: 'jackal.'
}

module.exports = (config) => {
  const grapherConfig = Object.assign(defaultConfig, config)

  grapherConfig.prefix = grapherConfig.prefix.endsWith('.')
    ? grapherConfig.prefix
    : `${grapherConfig.prefix}.`

  return new StatsD(grapherConfig)
}
