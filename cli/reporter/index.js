'use strict'

const pretty = require('./pretty')
const standard = require('./standard')
const teamcity = require('./teamcity')

const loggers = {
  pretty, standard, teamcity
}

module.exports = (reporters, config, done) => (err, data) => {
  if (err) {
    return done(err, data)
  }

  reporters
    .reduce((acc, reporter) => {
      const logs = loggers[reporter](data, config)
      acc.concat(logs)
      return logs
    }, [])
    .forEach((log) => {
      /* eslint-disable no-console */
      console.log(log)
      /* eslint-enable no-console */
    })

  return done(err, data)
}
