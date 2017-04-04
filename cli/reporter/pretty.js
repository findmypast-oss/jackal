'use strict'

const prettyjson = require('prettyjson')

module.exports = (data, config) => !config.pretty ? [] : [ prettyjson.render(data) ]
