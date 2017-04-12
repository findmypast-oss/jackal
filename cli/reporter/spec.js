'use strict'

// TODO: Consider revising this module, _especially_ the exported function with
// the if... elseif... else block

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

const vaildationErrorString = errors => {
  return errors.reduce((acc, error) => {
    return `${acc}\n        - ${error.name}: ${error.message}`
  }, '')
}

const validationSpecs = (validations) => {
  return validations.map(validation => {
    return validation.valid
      ? chalk.green(`    ${figures.tick} `) + chalk.dim(`${validation.contract} is valid`)
      : chalk.red(`    ${figures.cross} ${validation.contract} is invalid: ${vaildationErrorString(validation.errors)}`)
  })
}

const anyFailures = (results) => {
  return results.some(result => result.status === 'Fail')
}

module.exports = (err, response, body) => {
  const logs = []

  if (typeof response === 'string' && response.startsWith('Skipping')) {
    logs.push(response)
  } else if (body.message && body.validations) {
    logs.push(body.message)
    logs.push(validationSpecs(body.validations))
  } else if (body.message) {
    logs.push(body.message)
  } else if (body.length === 0) {
    logs.push('Failure - no contracts exist')
  } else {
    const provider = body[0].name.split('/')[0]

    if (anyFailures(body)) {
      logs.push('Failure - not all contracts passed')
    }

    logs.push(providerStart(provider))
    logs.push(consumerSpecs(body, provider))
  }

  return flattenDeep(logs)
}
