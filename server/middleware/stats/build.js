'use strict'

const buildStatsMiddleware = (db, json) => {
  return [
    json,
    require('./getStats')(db)
  ]
}

module.exports = buildStatsMiddleware
