#! /usr/bin/env node

'use strict'

const client = require('../client')
const startServer = require('../server')
const reporter = require('./reporter')
const configReader = require('./config-reader')

function start(options) {
  const config = configReader(options.configFile)

  startServer(config)
}

function send(contractsPath, jackalUrl, options) {
  const config = configReader(options.configFile)

  client.send(
    { contractsPath, jackalUrl },
    reporter(['pretty', 'teamcity'], config.reporters, exitCodeHandler)
  )
}

function run(jackalUrl, options) {
  const config = configReader(options.configFile)

  client.run(
    { jackalUrl },
    reporter(['pretty', 'teamcity'], config.reporters, exitCodeHandler)
  )
}

function dump(jackalUrl, options) {
  const config = configReader(options.configFile)
  client.dump(
    { jackalUrl },
    reporter(['standard'], config.reporters, exitCodeHandler)
  )
}

function exitCodeHandler(err) {
  err ? process.exit(1) : process.exit(0)
}

module.exports = {
  start, send, run, dump
}
