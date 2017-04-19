'use strict'

const forEach = require('lodash/forEach')
const processTestOutput = require('./process-test-output')
const mapResultsToConsumer = require('../lib/map-results-to-consumer')

const processConsumerResults = (results) => {
  return results.reduce((acc, result) => {
    return acc.concat(processTestOutput(result))
  }, [])
}

module.exports = (results, provider) => {
  const logs = []
  const resultsByConsumer = mapResultsToConsumer(results)

  logs.push(`##teamcity[testSuiteStarted name='${provider}-contracts']`)

  forEach(resultsByConsumer, (consumerResults, consumer) => {
    const name = `${consumer}-contracts-executed-against-${provider}`
    logs.push(`##teamcity[testSuiteStarted name='${name}']`)
    logs.push(processConsumerResults(consumerResults))
    logs.push(`##teamcity[testSuiteFinished name='${name}']`)
  })

  logs.push(`##teamcity[testSuiteFinished name='${provider}-contracts']`)

  return logs
}
