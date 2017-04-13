'use strict'

const chalk = require('chalk')
const figures = require('figures')

const vaildationErrorString = errors => {
  return errors.reduce((acc, error) => {
    return `${acc}\n        - ${error.name}: ${error.message}`
  }, '')
}

module.exports = (validations) => {
  return validations.map(validation => {
    return validation.valid
      ? chalk.green(`    ${figures.tick} `) + chalk.dim(`${validation.contract} is valid`)
      : chalk.red(`    ${figures.cross} ${validation.contract} is invalid: ${vaildationErrorString(validation.errors)}`)
  })
}
