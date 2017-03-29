'use strict'

const dump = require('../../../lib/contract').dump

const crutch = function (req, res, next) {
  const cache = dump()
  res.status(200).send(cache)

  return next()
}

module.exports = crutch
