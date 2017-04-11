'use strict'

const startServer = require('../../../../server')

let server

module.exports = {
  start:  (options, done) => { server = startServer(options, done) },
  stop:   (done)          => { server.close(done) }
}
