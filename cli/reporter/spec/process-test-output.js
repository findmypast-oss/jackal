'use strict'

const chalk = require('chalk')
const figures = require('figures')

const testPass = (provider, consumer, name) => {
  const tick = `    ${figures.tick} `
  const message = `Test ${name} passed for ${consumer} against ${provider}`

  return `${chalk.green(tick)}${chalk.dim(message)}`
}

const testFail = (provider, consumer, name, err) => {
  const cross = `    ${figures.cross} `
  const message = `Test ${name} failed for ${consumer} against ${provider}\n`

  const error = err.toString().split('\n').map(d => d.trim())
  const errorName = `    ${error.splice(0, 1)}`
  const errorDetails = `\n        ${error.join('\n        ')}`

  return chalk.red(`${cross}${message}${errorName}${errorDetails}`)
}

module.exports = (provider, consumer, test) => {
  const testName = test.name.split('/').slice(1).join(' ')

  return test.status === 'Fail'
    ? testFail(provider, consumer, testName, test.error)
    : testPass(provider, consumer, testName)
}
