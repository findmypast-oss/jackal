'use strict'

const buildStatsMiddleware = (db, json, gzip) => {
  return [
    json,
    gzip,
    require('./getStats')(db)
  ]
}

module.exports = buildStatsMiddleware
