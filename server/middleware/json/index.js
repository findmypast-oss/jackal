'use strict'

const json = (req, res, next) => {
  res.set({ 'Content-Type': 'application/json' })

  return next()
}

module.exports = json
