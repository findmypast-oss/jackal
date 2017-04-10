'use strict'

const spec = require('./spec')
const pretty = require('./pretty')
const json = require('./json')
const teamcity = require('./teamcity')

const loggers = {
  spec, json, pretty, teamcity
}

module.exports = (reporters, reporterOption, done) => (err, data) => {
  if (err) {
    return done(err, data)
  }

  if(reporterOption && !reporters.find(reporter => reporter === reporterOption)) {
    throw new Error(`Invalid reporter ${reporterOption} for command`)
  }

  const reporter = reporterOption
    ? loggers[reporterOption]
    : loggers[reporters[0]]

  /* eslint-disable no-console  */
  reporter(data).forEach((log) => console.log(log))
  /* eslint-enble no-console  */

  return done(err, data)
}
