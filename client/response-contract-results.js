'use strict'

function contractFailed (result) {
  return result.status === 'Fail'
}

function noContractsExistMessage (message) {
  return message.startsWith('No contracts exist for provider: ')
}

function parser (done) {
  return function (err, response, body) {
    if (err) {
      return done(err)
    }

    const parsed = JSON.parse(body)

    if (Array.isArray(parsed) && parsed.some(contractFailed)) {
      return done('Failure - not all contracts passed', parsed)
    }

    if (parsed.message && noContractsExistMessage(parsed.message)) {
      return done('Failure - no contracts exist', parsed)
    }

    return done(null, parsed)
  }
}

module.exports = parser
