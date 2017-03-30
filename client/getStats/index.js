'use strict'

const request = require('request')
const prettyjson = require('prettyjson')

const renderStats = function (error, response, body) {
  if (error) {
    /* eslint-disable no-console */
    console.error(error)
    /* eslint-enable no-console */
    process.exit(1)
  }

  const parsed = JSON.parse(body)
  const prettified = prettyjson.render(parsed)

  /* eslint-disable no-console */
  console.log(prettified)
  /* eslint-enable no-console */

  process.exit(0)
}

const getStats = function (jackalUrl, cb) {
  if (cb === undefined || cb === null) {
    request(jackalUrl, renderStats)
  }

  request(jackalUrl, cb)
}

module.exports = getStats
