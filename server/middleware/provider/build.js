'use strict'

const buildProviderMiddleware = (db, json, gzip, grapher) => {
  return [
    json,
    gzip,
    require('../validation/no-provider-contracts')(db),
    require('./execute')(db, grapher)
  ]
}

module.exports = buildProviderMiddleware
