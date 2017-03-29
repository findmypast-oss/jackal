'use strict'

const json = function (req, res, next) {
  res.set({ 'Content-Type': 'application/json' })

  next()
}

module.exports = json
