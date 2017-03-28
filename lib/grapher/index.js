'use strict'

const StatsD = require('hot-shots')

const defaultConfig = {
  host: 'localhost',
  port: 8125,
  prefix: 'jackal'
}

module.exports = config => {
  const grapherConfig = Object.assign(defaultConfig, config)

  return new StatsD(grapherConfig)
}
