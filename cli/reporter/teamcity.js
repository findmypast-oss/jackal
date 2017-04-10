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
    const name = `${consumer}-contracts-executed-against-${provider}`
    logs.push(`##teamcity[testSuiteStarted name='${name}']`)
    logs.push(results.reduce((acc, result) => acc.concat(testOutput(result)), []))
    logs.push(`##teamcity[testSuiteEnded name='${name}']`)
  })

  return logs
}

module.exports = (results) => {
  const provider = results[0].name.split('/')[0]
  let logs = []

  const name = `${provider}-contracts`
  logs.push(`##teamcity[testSuiteStarted name='${name}']`)
  logs.push(consumerLogs(results, provider))
  logs.push(`##teamcity[testSuiteEnded name='${name}']`)

  return flattenDeep(logs)
}
