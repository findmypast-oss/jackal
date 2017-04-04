#! /usr/bin/env node

'use strict'

const cli = require('./cli')
const pkg = require('./package.json')
const program = require('commander')

program
  .version(pkg.version)

program
  .command('start')
  .option('-c, --config-path [path]', 'Pass a path to a config file')
  .description('Start the Jackal microservice using the specified config file')
  .action(cli.start)

program
  .command('send <contractsPath> <jackalUrl>')
  .option('-c, --config-path [path]', 'Path to a jackal config file')
  .description('Send the consumer\'s contracts in the specified file to the Jackal service at the specified URL')
  .action(cli.send)

program
  .command('run <jackalUrl>')
  .option('-c, --config-path [path]', 'Path to a jackal config file')
  .description('Runs the provider\'s contracts stored in the database of the Jackal service at the specified URL')
  .action(cli.run)

program
  .command('dump <jackalUrl>')
  .option('-c, --config-path [path]', 'Path to a jackal config file')
  .description('Dumps the database of the Jackal service at the specified URL')
  .action(cli.dump)

// program
//   .command('stats <jackalUrl>')
//   .description('Gets usage stats from the running Jackal service at the specified URL')
//   .action(cli.stats)

program
  .parse(process.argv)
