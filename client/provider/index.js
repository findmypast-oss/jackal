'use strict'

const prettyjson = require('prettyjson')
const request = require('request')

const run = jackalUrl => {
  request(jackalUrl, (error, response, body) => {
    const parsed = JSON.parse(body)
    const prettified = prettyjson.render(parsed)

    /* eslint-disable no-console */
    console.log(prettified)
    /* eslint-enable no-console */

    if (response.statusCode === 200) {
      if (parsed.every(result => result.status === 'Pass')) {
        process.exit(0)
      }
    }

    process.exit(1)
  })
}

module.exports = run
