#! /usr/bin/env node

'use strict'

const client = require('../client')
const startServer = require('../server')
const reporter = require('./reporter')
const configReader = require('./config-reader')

const start = (options, config) => {
  startServer(config)
}

const send = (contractsPath, jackalUrl, options, config) => {
  client.send(
    { contractsPath, jackalUrl },
    reporter(['pretty', 'teamcity'], config.reporters, exitCodeHandler)
  )
}

const run = (jackalUrl, options, config) => {
  client.run(
    { jackalUrl },
    reporter(['pretty', 'teamcity'], config.reporters, exitCodeHandler)
  )
}

const dump = (jackalUrl, options, config) => {
  client.dump(
    { jackalUrl },
    reporter(['standard'], config.reporters, exitCodeHandler)
  )
}

const configWrapper = (fn) => function () {
  const args = Array.prototype.slice.call(arguments)
  const options = args[args.length-1]

  const config = configReader(options.configPath)

  fn.apply(null, args.concat(config))
}

const exitCodeHandler = (err) => {
  err ? process.exit(1) : process.exit(0)
}

module.exports = {
  start: configWrapper(start),
  send: configWrapper(send),
  run: configWrapper(run),
  dump: configWrapper(dump)
}
