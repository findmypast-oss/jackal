#! /usr/bin/env node

'use strict'

const cli = require('./cli')
const server = require('./server')
const pkg = require('./package.json')
const program = require('commander')

program
  .version(pkg.version)

program
  .command('start')
  .description('Start the Jackal server')
  .option('-c, --config-path [path]', 'Pass a path to a config file, default ./jackal.json')
  .option('-p, --port [port]', 'Port to run the server on, default 25863')
  .action(server)

program
  .command('send <jackalUrl> <contractsPath>')
  .option('-R, --reporter [reporter]', 'Reporter for output [json|spec|teamcity]')
  .option('--skip-missing-contract', 'Do not execute tests if the contracts file is missing')
  .description('Send the consumer\'s contracts in the specified file to the Jackal service')
  .action(cli.send)

program
  .command('run <jackalUrl> <providerName>')
  .option('-R, --reporter [reporter]', 'Reporter for output [json|spec|teamcity]')
  .option('-t, --test-url [testUrl]', 'Base url of the provider, defaults to the original URL specified by the consumer contract')
  .description('Runs the provider\'s contracts stored in the database of the Jackal service')
  .action(cli.run)

program
  .command('dump <jackalUrl>')
  .option('-R, --reporter [reporter]', 'Reporter for output [json|pretty]')
  .description('Dumps the database of the Jackal service')
  .action(cli.dump)

program
  .command('stats <jackalUrl>')
  .option('-C, --consumer [consumer]', 'Consumer to retrieve current statistics for')
  .option('-P, --provider [provider]', 'Provider to retrieve current statistics for')
  .option('-R, --reporter [reporter]', 'Reporter for output [json|pretty]')
  .description('Gets usage stats from the running Jackal service')
  .action(cli.stats)

program
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
