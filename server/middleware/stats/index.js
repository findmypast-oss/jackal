'use strict'

const stats = (req, res, next) => {
  res.send({ stats: 'aaah' })
  next()
}

module.exports = stats
