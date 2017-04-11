#! /usr/bin/env node

'use strict'

const client = require('../client')
const reporter = require('./reporter')
const prettyjson = require('prettyjson')

const dump = (jackalUrl, options) => {
  client.dump(
    jackalUrl,
    options,
    reporter(['json', 'pretty'], options.reporter, exitCodeHandler)
  )
}

const run = (jackalUrl, providerName, options) => {
  client.run(
    jackalUrl,
    providerName,
    options,
    reporter(['spec', 'teamcity', 'json'], options.reporter, exitCodeHandler)
  )
}

const send = (jackalUrl, contractsPath, options) => {
  client.send(
    jackalUrl,
    contractsPath,
    options,
    reporter(['spec', 'teamcity', 'json'], options.reporter, exitCodeHandler)
  )
}

const stats = (jackalUrl, options) => {
  client.stats(
    jackalUrl,
    options,
    reporter(['pretty', 'json'], options.reporter, exitCodeHandler)
  )
}

const errorWrapper = (fn) => function () {
  try {
    fn.apply(null, arguments)
  } catch (err) {
    /* eslint-disable no-console  */
    console.error(JSON.stringify(err))
    /* eslint-enble no-console  */
    process.exit(1)
  }
}

const exitCodeHandler = (err, data) => {
  if (err) {
    /* eslint-disable no-console  */
    console.error(JSON.stringify(err))
    if(data){
      console.error(prettyjson.render(data))
    }
    /* eslint-enble no-console  */
    process.exit(1)
  }

  process.exit(0)
}

module.exports = {
  send:  errorWrapper(send),
  run:   errorWrapper(run),
  dump:  errorWrapper(dump),
  stats: errorWrapper(stats)
}
