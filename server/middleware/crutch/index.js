'use strict'

const { dump } = require('../../../lib/contract')

const crutch = (req, res, next) => {
  const cache = dump()

  res.setHeader('Content-Type', 'application/json');
  res.send(cache)
  next()
}

module.exports = crutch
