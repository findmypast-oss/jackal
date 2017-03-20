'use strict'

const { dump } = require('../../../lib/contract')

const crutch = (req, res, next) => {
  const cache = dump()
  res.set({ 'Content-Type': 'application/json' }).status(200).send(cache)

  return next()
}

module.exports = crutch
