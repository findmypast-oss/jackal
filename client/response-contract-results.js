'use strict'

const prefix = 'No contracts exist for provider: '
const contractFailed = (result) => result.status === 'Fail'
const noContractsExistMessage = (message) => message.startsWith(prefix)

module.exports = (done) => (err, response, body) => {
  if (err) {
    return done(err, body)
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
