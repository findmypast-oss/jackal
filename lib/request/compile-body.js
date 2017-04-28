'use strict'

const _ = require('lodash')
const hyperid = require('hyperid')
const instance = hyperid()

module.exports = (body) => {
  if (body.includes('<%=') && body.includes('%>')) {
    const compileBody = _.template(body)
    return compileBody({ hyperid: instance() })
  }

  return body
}
