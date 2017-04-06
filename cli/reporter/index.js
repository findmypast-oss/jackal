'use strict'

const pretty = require('./pretty')
const standard = require('./standard')
const teamcity = require('./teamcity')

const loggers = {
  pretty, standard, teamcity
}

module.exports = (reporters, config, done) => (err, data) => {
  if (err) {
    console.error(err)

    return done(err, data)
  }

  reporters
    .reduce((acc, reporter) => {
      const logs = loggers[reporter](data, config)
      return acc.concat(logs)
    }, [])
    .forEach((log) => {
      console.log(log)
    })

  return done(err, data)
}
