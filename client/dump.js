'use strict'

const request = require('request')

function dump(options, done) {
  request(options.jackalUrl + '/api/contracts', (err, response, body) => {
    if(err) {
      return done(err)
    }

    if(!options.quiet) {
      /* eslint-disable no-console */
      console.log(body)
      /* eslint-enable no-console */
    }

    return done(null, body)
  })
}

module.exports = dump
