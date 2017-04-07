'use strict'

const prettyjson = require('prettyjson')

module.exports = (data, config) => {
  return !config.pretty || !data ? [] : [ prettyjson.render(data) ]
}
