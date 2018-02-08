'use strict'

const pkgInfo = require('../../package.json')

module.exports = (req, res, next) => {
  res.set({ 'jackal-server-version': pkgInfo.version })

  next()
}
