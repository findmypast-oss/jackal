'use strict'

const prettyjson = require('prettyjson')

function contractFailed (result) {
  return result.status === 'Fail'
}

function parserCallback (statusCode, quiet, done) {
  return function (err, response, body) {
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
    
    if (response.statusCode !== statusCode) {
      return done(
        'Failure - expected response code ' + statusCode + ' got ' + response.statusCode,
        parsed
      )
    }

    if (parsed.some(contractFailed)) {
      return done('Failure - not all contracts passed', parsed)
    }

    return done(null, parsed)
  }
}

module.exports = parserCallback
