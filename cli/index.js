#! /usr/bin/env node

'use strict'

const fs = require('fs')
const prettyjson = require('prettyjson')
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
  client.send(
    { contractsPath, jackalUrl },
    prettyprint(exitCodeHandler)
  )
}

function run(jackalUrl) {
  client.run(
    { jackalUrl },
    prettyprint(exitCodeHandler)
  )
}

function dump(jackalUrl) {
  client.dump(
    { jackalUrl },
    print(exitCodeHandler)
  )
}

// function stats (jackalUrl){
//
// }

function print(fn) {
  var args =

  return function (err, data) {
    /* eslint-disable no-console */
    console.log(data)
    /* eslint-enable no-console */

    return fn(Array.prototype.slice.apply(arguments))
  }
}

function prettyprint(fn) {
  var args = Array.prototype.slice.apply(arguments)

  return function (err, data) {
    const prettified = prettyjson.render(data)

    /* eslint-disable no-console */
    console.log(prettified)
    /* eslint-enable no-console */

    return fn(args)
  }
}

function exitCodeHandler(err) {
  err ? process.exit(1) : process.exit(0)
}

module.exports = {
  start, send, run, dump
}
