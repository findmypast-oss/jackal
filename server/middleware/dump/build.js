'use strict'

const buildDumpMiddleware = (db, json, gzip) => {
  return [
    json,
    gzip,
    require('./dump')(db)
  ]
}

module.exports = buildDumpMiddleware
