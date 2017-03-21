'use strict'

const fs = require('fs')
const program = require('commander')
const startJackal = require('./lib')
const pkg = require('./package.json')

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
        logger: { environment: 'production' }
      }
    }

    startJackal(config)
  })

program
  .parse(process.argv)
