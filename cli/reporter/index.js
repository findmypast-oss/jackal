'use strict'

const pkgInfo = require('../../package.json')
const chalk = require('chalk')
const spec = require('./spec')
const pretty = require('./pretty')
const json = require('./json')
const teamcity = require('./teamcity')

const loggers = {
  spec, json, pretty, teamcity
}

const statusErrorMap = {
  SKIPPED:      null,
  ERROR:        'Aborting',
  NO_CONTRACTS: null,
  INVALID:      'Invalid contracts',
  FAILED:       'Tests failed',
  PASSED:       null
}


const minorVersionMatches = (clientVersion, serverVersion) => {
  if (!clientVersion || !serverVersion) {
    return false
  }

  const clientVersionArray = clientVersion.split('.')
  const serverVersionArray = serverVersion.split('.')

  return clientVersionArray[0] === serverVersionArray[0] && clientVersionArray[1] === serverVersionArray[1]
}

const printVersionMatchWarning = (response) => {
  if (response) {
    const clientVersion = pkgInfo.version
    const serverVersion = response.headers['jackal-server-version']
    if (!minorVersionMatches(clientVersion, serverVersion)) {
      /* eslint-disable no-console  */
      console.error(chalk.yellow(`Warning! Client Version ${clientVersion} does not match server version ${serverVersion}`))
      /* eslint-enble no-console  */
    }
  }
}

module.exports = (reporters, reporterOption, done) => (err, response, body) => {
  printVersionMatchWarning(response)

  if (err) {
    return done(err, response, body)
  }

  if(reporterOption && !reporters.find(reporter => reporter === reporterOption)) {
    throw new Error(`Invalid reporter ${reporterOption} for command`)
  }

  const reporter = reporterOption
    ? loggers[reporterOption]
    : loggers[reporters[0]]

  /* eslint-disable no-console  */
  reporter(err, response, body).forEach((log) => console.log(log))
  /* eslint-enble no-console  */

  return done(statusErrorMap[body.status], response, body)
}
