'use strict'

const request = require('request')

function dump(options, done) {
  request(options.jackalUrl + '/api/contracts', (err, response, body) => {
    if (err) {
      return done(err)
    }

    return done(null, body)
  })
}

module.exports = dump
