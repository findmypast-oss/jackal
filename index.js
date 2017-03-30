#! /usr/bin/env node

'use strict'

const client = require('./client')
const fs = require('fs')
const pkg = require('./package.json')
const program = require('commander')
const startJackal = require('./lib')

const generateCallback = client.generateCallback
const run = client.run
const send = client.send
const getStats = client.getStats

program
  .version(pkg.version)

program
  .command('start [configPath]')
  .description('Start the Jackal microservice using the specified config file')
  .action(function (configPath) {
    let config

    if (configPath) {
      const buffer = fs.readFileSync(configPath)
      config = JSON.parse(buffer.toString())
    } else {
      config = {
        logger: { environment: 'production' },
        statsD: { host: 'localhost', port: 8125, prefix: 'jackal' }
      }
    }

    startJackal(config)
  })

program
  .command('send <contractsPath> <jackalUrl>')
  .description('Send the consumer\'s contracts in the specified file to the Jackal service at the specified URL')
  .action(function (contractsPath, jackalUrl) {
    send(contractsPath, jackalUrl, generateCallback(201))
  })

program
  .command('run <jackalUrl>')
  .description('Runs the provider\'s contracts stored in the database of the Jackal service at the specified URL')
  .action(function (jackalUrl) {
    run(jackalUrl, generateCallback(200))
  })

// program
//   .command('stats <jackalUrl>')
//   .description('Gets usage stats from the running Jackal service at the specified URL')
//   .action(function (jackalUrl) {
//     getStats(jackalUrl)
//   })

program
  .parse(process.argv)
