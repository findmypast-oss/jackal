'use strict'

const forEach = require('lodash/forEach')
const flattenDeep = require('lodash/flattenDeep')

const testOutput = (result) => {
  const testName = [result.consumer]
    .concat(result.name.split('/').slice(1))
    .join('.')

  const logs = []
  logs.push(`##teamcity[testStarted name='${testName}']`)

  if (result.status === 'Fail') {
    logs.push(`##teamcity[testFailed name='${testName}' message='Test failed for ${result.consumer}' details='${result.error}']`)
  }

  logs.push(`##teamcity[testFinished name='${testName}']`)

  return logs
}

const consumerLogs = (allResults, provider) => {
  const resultsByConsumer = allResults.reduce((acc, result) => {
    acc[result.consumer] = acc[result.consumer] || []
    acc[result.consumer].push(result)
    return acc
  }, {})

  let logs = []

  forEach(resultsByConsumer, (results, consumer) => {
    logs.push(`##teamcity[testSuiteStarted name='${consumer} contracts executed against ${provider}']`)
    logs.push(results.reduce((acc, result) => acc.concat(testOutput(result)), []))
    logs.push(`##teamcity[testSuiteEnded name='${consumer} contracts executed against ${provider}']`)
  })

  return logs
}

module.exports = (results, config) => {
  if (!config.teamcity) { return [] }

  const provider = results[0].name.split('/')[0]
  let logs = []

  logs.push(`##teamcity[testSuiteStarted name='${provider} contracts']`)

  logs.push(consumerLogs(results, provider))

  logs.push(`##teamcity[testSuiteEnded name='${provider} contracts']`)

  return flattenDeep(logs)
}
