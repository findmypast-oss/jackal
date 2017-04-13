'use strict'

const prettyjson = require('prettyjson')

module.exports = (err, res, body) => body ? [ prettyjson.render(body) ] : []
