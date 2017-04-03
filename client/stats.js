'use strict'

const request = require('request')

function stats(options, done) {
  request(options.jackalUrl + '/api/stats', function (err, response, body) {
    if (err) {
      return done(err)
    }

    return done(null, body)
  })
}

module.exports = stats
