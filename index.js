#! /usr/bin/env node

'use strict'

const client = require('./client')
const fs = require('fs')
const pkg = require('./package.json')
const program = require('commander')
const startJackal = require('./lib')

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
  .action(function(contractsPath, jackalUrl){
    client.send(contractsPath, jackalUrl, false, exitCodeHandler)
  })

program
  .command('run <jackalUrl>')
  .description('Runs the provider\'s contracts stored in the database of the Jackal service at the specified URL')
  .action(function(jackalUrl){
    client.run(jackalUrl, false, exitCodeHandler)
  })

program
  .command('dump <jackalUrl>')
  .description('Dumps the database of the Jackal service at the specified URL')
  .action(function(jackalUrl){
    client.dump({
      jackalUrl: jackalUrl,
      quiet: false
    }, exitCodeHandler)
  })

// program
//   .command('stats <jackalUrl>')
//   .description('Gets usage stats from the running Jackal service at the specified URL')
//   .action(exitCodeWrapper(client.getStats))

program
  .parse(process.argv)

function exitCodeHandler(err) {
  err ? process.exit(1) : process.exit(0)
}
