#! /usr/bin/env node

'use strict'

const cli = require('./cli')
const pkg = require('./package.json')
const program = require('commander')

program
  .version(pkg.version)
  .option('-p, --print-config', 'Print the config into the terminal')

program
  .command('start')
  .option('-c, --config-path [path]', 'Pass a path to a config file, default ./jackal.json')
  .description('Start the Jackal microservice')
  .action(cli.start)

program
  .command('send <contractsPath>')
  .option('-c, --config-path [path]', 'Path to a jackal config file, default ./jackal.json')
  .description('Send the consumer\'s contracts in the specified file to the Jackal service')
  .action(cli.send)

program
  .command('run <providerName>')
  .option('-c, --config-path [path]', 'Path to a jackal config file, default ./jackal.json')
  .description('Runs the provider\'s contracts stored in the database of the Jackal service')
  .action(cli.run)

program
  .command('dump')
  .option('-c, --config-path [path]', 'Path to a jackal config file, default ./jackal.json')
  .description('Dumps the database of the Jackal service')
  .action(cli.dump)

program
  .command('stats')
  .option('-c, --config-path [path]', 'Path to a jackal config file, default ./jackal.json')
  .description('Gets usage stats from the running Jackal service')
  .action(cli.stats)

program
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
