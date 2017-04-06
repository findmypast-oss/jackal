'use strict'

module.exports = (done) => (err, response, body) => {
  if (err) {
    return done(err)
  }

  return done(null, JSON.parse(body))
}
