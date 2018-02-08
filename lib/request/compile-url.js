'use strict'

const _ = require('lodash')

module.exports = (url, variables) => _.template(url)(variables)
