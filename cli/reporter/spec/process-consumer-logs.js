'use strict'

const forEach = require('lodash/forEach')
const processTestOutput = require('./process-test-output')
const mapResultsToConsumer = require('../lib/map-results-to-consumer')

const processConsumerResults = (results, consumer, provider) => {
  return results.map((result) => {
    return processTestOutput(provider, consumer, result)
  })
}

module.exports = (allResults, provider) => {
  const logs = []
  const resultsByConsumer = mapResultsToConsumer(allResults)

  logs.push(`${provider} contracts executed`)

  forEach(resultsByConsumer, (results, consumer) => {
    logs.push(`  ${consumer} contracts executed against ${provider}`)
    logs.push(processConsumerResults(results, consumer, provider))
  })

  return logs
}
