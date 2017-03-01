'use strict'

const expressPino = require('express-pino-logger')

const pino = require('pino')
const inst = pino({
  name: 'jackal'
})

const logger = inst.child({
  environment: 'dev',
  colour: 'black'
})

module.exports = expressPino({
  logger: logger
})
