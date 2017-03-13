'use strict'

const { dump } = require('../../../lib/contract')

const crutch = (req, res, next) => {
  const contracts = dump()
  res.send(contracts)
  next()
}

module.exports = crutch
