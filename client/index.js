'use strict'

const prettyjson = require('prettyjson')

const run = require('./provider')
const send = require('./consumer')

const generateCallback = function (statusCode) {
  return function (error, response, body) {
    const parsed = JSON.parse(body)
    const prettified = prettyjson.render(parsed)

    /* eslint-disable no-console */
    console.log(prettified)
    /* eslint-enable no-console */

    if (response.statusCode === statusCode) {
      if (parsed.every(result => result.status === 'Pass')) {
        process.exit(0)
      }
    }

    process.exit(1)
  }
}

module.exports = { generateCallback, run, send }
