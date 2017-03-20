'use strict'

const pino = require('pino')
const inst = pino({
  name: 'jackal'
})

const defaultConfig = {
  environment: 'dev'
}

module.exports = config => {
  const loggerConfig = Object.assign(defaultConfig, config)

  return inst.child(loggerConfig)
}
