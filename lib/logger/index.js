'use strict'

const pino = require('pino')
const inst = pino({
  name: 'jackal'
})

const logger = inst.child({
  environment: 'dev',
  colour: 'black'
})

module.exports = logger
