'use strict'

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


module.exports = (reporters, reporterOption, done) => (err, response, body) => {
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
