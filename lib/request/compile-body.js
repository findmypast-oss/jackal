'use strict'

const _ = require('lodash')
const hyperid = require('hyperid')
const instance = hyperid()

module.exports = (body) => {
  const compileBody = _.template(body)
  return compileBody({ hyperid: instance() })
}
