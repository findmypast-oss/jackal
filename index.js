'use strict'

const fs = require('fs')
const pkg = require('./package.json')
const program = require('commander')
const { run, send } = require('./client')
const startJackal = require('./lib')

const exitCodeWrapper = (fn) => (...args) => {
  fn(...args, (err) => {
    if(err){
      /* eslint-disable no-console */
      console.error(err)
      /* eslint-enable no-console */
      process.exit(1)
    }
    process.exit(0)
  })
}

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
  .action(exitCodeWrapper(send))

program
  .command('run <jackalUrl>')
  .description('Runs the provider\'s contracts stored in the database of the Jackal service at the specified URL')
  .action(exitCodeWrapper(run))

program
  .parse(process.argv)
