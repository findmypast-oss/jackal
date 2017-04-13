'use strict'

module.exports = (result) => {
  const partialName = result.name.split('/').slice(1)
  const testName = [result.consumer].concat(partialName).join('.')

  const logs = []
  logs.push(`##teamcity[testStarted name='${testName}']`)

  if (result.status === 'Fail') {
    const name = `name='${testName}'`
    const message = `message='Test failed for ${result.consumer}'`
    const details = `details='${result.error}'`

    logs.push(`##teamcity[testFailed ${name} ${message} ${details}]`)
  }

  logs.push(`##teamcity[testFinished name='${testName}']`)

  return logs
}
