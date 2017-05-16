'use strict'

module.exports = (done) => (err, response, body) => {
  let parsedBody = body

  if (body) {
    try {
      parsedBody = JSON.parse(body)
    } catch (ex) {
      return done(ex, response, parsedBody)
    }
  }

  return done(err, response, parsedBody)
}
