#! /usr/bin/env node

'use strict'

const cli = require('./cli')
const pkg = require('./package.json')
const program = require('commander')

program
  .version(pkg.version)

program
  .command('start')
  .description('Start the Jackal server')
  .option('-c, --config-path [path]', 'Pass a path to a config file, default ./jackal.json')
  .option('-p, --port [port]', 'Port to run the server on, default 25863')
  .option('-v, --verbose [verbose]', 'Verbose logging')
  .action(cli.start)

program
  .command('send <contractsPath>')
  .option('-c, --config-path [path]', 'Path to a jackal config file, default ./jackal.json')
  .option('-b, --base-url [baseUrl]', 'Base url of the jackal server, default http://localhost')
  .option('-p, --port [port]', 'Port of the jackal server, default 25863')
  .option('-v, --verbose [verbose]', 'Verbose logging')
  .description('Send the consumer\'s contracts in the specified file to the Jackal service')
  .action(cli.send)

program
  .command('run <providerName>')
  .option('-c, --config-path [path]', 'Path to a jackal config file, default ./jackal.json')
  .option('-b, --base-url [baseUrl]', 'Base url of the jackal server, default http://localhost')
  .option('-p, --port [port]', 'Port of the jackal server, default 25863')
  .option('-v, --verbose [verbose]', 'Verbose logging')
  .description('Runs the provider\'s contracts stored in the database of the Jackal service')
  .action(cli.run)

program
  .command('dump')
  .option('-c, --config-path [path]', 'Path to a jackal config file, default ./jackal.json')
  .option('-b, --base-url [baseUrl]', 'Base url of the jackal server, default http://localhost')
  .option('-p, --port [port]', 'Port of the jackal server, default 25863')
  .option('-v, --verbose [verbose]', 'Verbose logging')
  .description('Dumps the database of the Jackal service')
  .action(cli.dump)

program
  .command('stats')
  .option('-c, --config-path [path]', 'Path to a jackal config file, default ./jackal.json')
  .option('-b, --base-url [baseUrl]', 'Base url of the jackal server, default http://localhost')
  .option('-p, --port [port]', 'Port of the jackal server, default 25863')
  .option('-v, --verbose [verbose]', 'Verbose logging')
  .description('Gets usage stats from the running Jackal service')
  .action(cli.stats)

program
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
