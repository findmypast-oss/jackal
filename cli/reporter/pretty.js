'use strict'

const prettyjson = require('prettyjson')

module.exports = (data) => {
  if (data) {
    const parsed = JSON.parse(data)
    return [ prettyjson.render(parsed) ]
  }

  return []
}
