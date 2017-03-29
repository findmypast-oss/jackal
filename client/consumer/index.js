'use strict'

const fs = require('fs')
const prettyjson = require('prettyjson')
const request = require('request')

const send = (contractsPath, jackalUrl) => {
  const buffer = fs.readFileSync(contractsPath)
  const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
  const req = { url: jackalUrl, method: 'POST', headers: headers, body: buffer }

  request(req, (error, response, body) => {
    const parsed = JSON.parse(body)
    const prettified = prettyjson.render(parsed)

    /* eslint-disable no-console */
    console.log(prettified)
    /* eslint-enable no-console */

    if (response.statusCode === 201) {
      if (parsed.every(result => result.status === 'Pass')) {
        process.exit(0)
      }
    }

    process.exit(1)
  })
}

module.exports = send
