'use strict'

const request = require('request')
const prettyjson = require('prettyjson')

const getStats = function (jackalUrl, quiet, done) {
  request(jackalUrl, function (err, response, body) {
    if (err) {
      return done(err)
    }

    const parsed = JSON.parse(body)
    const prettified = prettyjson.render(parsed)

    if (!quiet) {
      /* eslint-disable no-console */
      console.log(prettified)
      /* eslint-enable no-console */
    }

    return done(null, parsed)
  })
}

module.exports = getStats
