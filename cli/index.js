#! /usr/bin/env node

'use strict'

const client = require('../client')
const startServer = require('../server')
const reporter = require('./reporter')
const configReader = require('./config-reader')

const dump = (config) => {
  client.dump(
    config,
    reporter(['standard'], config.reporters, exitCodeHandler)
  )
}

const run = (providerName, config) => {
  client.run(
    providerName,
    config,
    reporter(['pretty', 'teamcity'], config.reporters, exitCodeHandler)
  )
}

const send = (contractsPath, config) => {
  client.send(
    contractsPath,
    config,
    reporter(['pretty', 'teamcity'], config.reporters, exitCodeHandler)
  )
}

const start = (config) => {
  startServer(config)
}

const stats = (config) => {
  client.stats(
    config,
    reporter(['pretty'], config.reporters, exitCodeHandler)
  )
}

const errorWrapper = (fn) => function () {
  try {
    fn.apply(null, arguments)
  } catch (err) {
    /* eslint-disable no-console  */
    console.error(err)
    /* eslint-enble no-console  */
    process.exit(1)
  }
}

const configWrapper = (fn) => function () {
  const args = Array.from(arguments)
  const options = args.pop()
  const config = configReader(options)
  const newArgs = args.concat(config)

  if (options.verbose) {
    /* eslint-disable no-console  */
    console.log(config)
    /* eslint-enble no-console  */
  }

  fn.apply(null, newArgs)
}

const exitCodeHandler = (err) => {
  if (err) {
    /* eslint-disable no-console  */
    console.error(err)
    /* eslint-enble no-console  */
    process.exit(1)
  }

  process.exit(0)
}

module.exports = {
  start: errorWrapper(configWrapper(start)),
  send:  errorWrapper(configWrapper(send)),
  run:   errorWrapper(configWrapper(run)),
  dump:  errorWrapper(configWrapper(dump)),
  stats: errorWrapper(configWrapper(stats))
}
