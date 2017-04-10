'use strict'

const chalk = require('chalk')
const forEach = require('lodash/forEach')
const flattenDeep = require('lodash/flattenDeep')
const figures = require('figures')

const providerStart = (provider) =>
  `${provider} contracts executed`

const consumerStart = (consumer, provider) =>
  `  ${consumer} contracts executed against ${provider}`

const testResult = (provider, consumer, test) => {
  const testName = test.name.split('/').slice(1).join('-')

  return test.status === 'Fail'
    ? testFail(provider, consumer, testName, test.error)
    : testPass(provider, consumer, testName)
}

const testPass = (provider, consumer, testName) =>
  chalk.green(`    ${figures.tick} `) +
  chalk.dim(`Test ${testName} passed for ${consumer} against ${provider}`)

const testFail = (provider, consumer, testName, error) =>
  chalk.red(`    ${figures.cross} Test ${testName} failed for ${consumer} against ${provider}
    ${error}`)

const consumerSpecs = (allResults, provider) => {
  const resultsByConsumer = allResults.reduce((acc, result) => {
    acc[result.consumer] = acc[result.consumer] || []
    acc[result.consumer].push(result)
    return acc
  }, {})

  const logs = []

  forEach(resultsByConsumer, (results, consumer) => {
    logs.push(consumerStart(consumer, provider))
    logs.push(results.map((result) => testResult(provider, consumer, result)))
  })

  return logs
}

const validationSpecs = (validations) => {
  return validations.map(validation => {
    return validation.valid
      ? chalk.green(`    ${figures.tick} `) + chalk.dim(`${validation.contract} is valid`)
      : chalk.red(`    ${figures.cross} ${validation.contract} is invalid: ${JSON.stringify(validation.errors)}`)
  })
}

module.exports = (results) => {
  const logs = []

  if (results.validations) {
    logs.push(results.message)
    logs.push(validationSpecs(results.validations))
  } else {
    const provider = results[0].name.split('/')[0]

    logs.push(providerStart(provider))
    logs.push(consumerSpecs(results, provider))
  }

  return flattenDeep(logs)
}
