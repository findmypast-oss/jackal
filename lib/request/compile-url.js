'use strict'

const _ = require('lodash')

module.exports = (url, variables) => {
  return url.includes('<%=') && url.includes('%>')
    ? _.template(url)(variables)
    : url
}
