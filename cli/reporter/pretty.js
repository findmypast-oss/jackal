'use strict'

const prettyjson = require('prettyjson')

module.exports = (err, response, body) => {
  if (body) {
    return [ prettyjson.render(body) ]
  }

  return []
}
