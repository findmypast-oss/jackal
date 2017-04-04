'use strict'

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

module.exports = (results, config) => {
  if (!config.teamcity) { return [] }

  const provider = results[0].name.split('/')[0]
  let logs = []

  logs.push(`##teamcity[testSuiteStarted name='${provider}']`)

  logs = results.reduce((acc, result) => {
    const testLogs = testOutput(result)
    return acc.concat(testLogs)
  }, logs)

  logs.push(`##teamcity[testSuiteEnded name='${provider}']`)

  return logs
}
