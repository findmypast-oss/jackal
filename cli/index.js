#! /usr/bin/env node

'use strict'

const client = require('../client')
const startServer = require('../server')
const reporter = require('./reporter')
const configReader = require('./config-reader')

const start = (config) => {
  startServer(config)
}

const send = (contractsPath, config) => {

  client.send(
    contractsPath,
    config,
    reporter(['pretty', 'teamcity'], config.reporters, exitCodeHandler)
  )
}

const run = (providerName, config) => {
  client.run(
    providerName,
    config,
    reporter(['pretty', 'teamcity'], config.reporters, exitCodeHandler)
  )
}

const dump = (config) => {
  client.dump(
    config,
    reporter(['standard'], config.reporters, exitCodeHandler)
  )
}

const stats = (config) => {
  client.stats(
    config,
    reporter(['standard'], config.reporters, exitCodeHandler)
  )
}

const configWrapper = (fn) => function () {
  const args = Array.prototype.slice.call(arguments)
  const options = args[args.length-1]
  const config = configReader(options)
  const newArgs = args.slice(0,1).concat(config)

  fn.apply(null, newArgs)
}

const exitCodeHandler = (err) => {
  err ? process.exit(1) : process.exit(0)
}

module.exports = {
  start:  configWrapper(start),
  send:   configWrapper(send),
  run:    configWrapper(run),
  dump:   configWrapper(dump),
  stats:  configWrapper(stats)
}
