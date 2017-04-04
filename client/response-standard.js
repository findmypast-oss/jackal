'use strict'

module.exports = (done) => (err, response, body) => err ? done(err) : done(null, body)
