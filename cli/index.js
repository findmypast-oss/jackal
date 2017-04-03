#! /usr/bin/env node

'use strict'

const fs = require('fs')
const client = require('../client')
const startServer = require('../server')

function start(configPath) {
  let config

  if (configPath) {
    const buffer = fs.readFileSync(configPath)
    config = JSON.parse(buffer.toString())
  } else {
    config = {
      logger: { environment: 'production' },
      statsD: { host: 'localhost', port: 8125, prefix: 'jackal' },
      db:     { path: 'db.json' }
    }
  }

  startServer(config)
}

function send(contractsPath, jackalUrl) {
  client.send(contractsPath, jackalUrl, false, exitCodeHandler)
}

function run(jackalUrl) {
  client.run(jackalUrl, false, exitCodeHandler)
}

function dump(jackalUrl) {
  client.dump({
    jackalUrl: jackalUrl,
    quiet: false
  }, exitCodeHandler)
}

// function stats (jackalUrl){
//
// }

function exitCodeHandler(err) {
  err ? process.exit(1) : process.exit(0)
}

module.exports = {
  start, send, run, dump
}
