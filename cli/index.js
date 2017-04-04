#! /usr/bin/env node

'use strict'

const client = require('../client')
const startServer = require('../server')
const reporter = require('./reporter')
const configReader = require('./config-reader')

function start(options, config) {
  startServer(config)
}

function send(contractsPath, jackalUrl, options, config) {
  client.send(
    { contractsPath, jackalUrl },
    reporter(['pretty', 'teamcity'], config.reporters, exitCodeHandler)
  )
}

function run(jackalUrl, options, config) {
  client.run(
    { jackalUrl },
    reporter(['pretty', 'teamcity'], config.reporters, exitCodeHandler)
  )
}

function dump(jackalUrl, options, config) {
  client.dump(
    { jackalUrl },
    reporter(['standard'], config.reporters, exitCodeHandler)
  )
}

function configWrapper(fn) {
  return function() {
    var args = Array.prototype.slice.call(arguments)
    var options = args[args.length-1]

    const config = configReader(options.configPath)

    fn.apply(null, args.concat(config))
  }
}

function exitCodeHandler(err) {
  err ? process.exit(1) : process.exit(0)
}

module.exports = {
  start: configWrapper(start),
  send: configWrapper(send),
  run: configWrapper(run),
  dump: configWrapper(dump)
}
