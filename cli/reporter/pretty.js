'use strict'

const prettyjson = require('prettyjson')

module.exports = (data) => {
  return !data ? [] : [ prettyjson.render(data) ]
}
