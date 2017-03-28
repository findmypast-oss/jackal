const Promise = require('bluebird')
const { run, send } = require('./../../client')

module.exports = {
  run: Promise.promisify(run),
  send: Promise.promisify(send)
}
