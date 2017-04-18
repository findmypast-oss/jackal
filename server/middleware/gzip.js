'use strict'

module.exports = (req, res, next) => {
  res.set({ 'Content-Encoding': 'gzip' })

  next()
}
