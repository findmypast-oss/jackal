'use strict'

const fs = require('fs')
const pkg = require('./package.json')
const program = require('commander')
const { generateCallback, run, send } = require('./client')
const startJackal = require('./lib')

program
  .version(pkg.version)

program
  .command('start [configPath]')
  .description('Start the Jackal microservice using the specified config file')
  .action(configPath => {
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
  .action((contractsPath, jackalUrl) => send(contractsPath, jackalUrl, generateCallback(200)))

program
  .command('run <jackalUrl>')
  .description('Runs the provider\'s contracts stored in the database of the Jackal service at the specified URL')
  .action(jackalUrl => run(jackalUrl, generateCallback(201)))

program
  .parse(process.argv)
