'use strict'

module.exports = (done) => (err, response, body) => {
  const parsedBody = body ? JSON.parse(body) : body

  return done(err, response, parsedBody)
}
