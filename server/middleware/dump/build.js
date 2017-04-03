'use strict'

const buildDumpMiddleware = (db, json) => {
  return [
    json,
    require('./dump')(db)
  ]
}

module.exports = buildDumpMiddleware
