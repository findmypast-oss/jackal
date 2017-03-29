'use strict'

const prettyjson = require('prettyjson')
const request = require('request')

const run = (jackalUrl, done) => {
  request(jackalUrl, (err, response, body) => {
    if(err) return done(err)

    const parsed = JSON.parse(body)
    const prettified = prettyjson.render(parsed)

    /* eslint-disable no-console */
    console.log(prettified)
    /* eslint-enable no-console */

    if (response.statusCode === 200) {
      if (parsed.every(result => result.status === 'Pass')) {
        return done(null, parsed)
      }
    }

    return done(new Error('Some contracts failed'), parsed)
  })
}

module.exports = run
