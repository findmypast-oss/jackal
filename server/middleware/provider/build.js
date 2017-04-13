'use strict'

const buildProviderMiddleware = (db, json, grapher) => {
  return [
    json,
    require('../validation/no-provider-contracts')(db),
    require('./execute')(db, grapher)
  ]
}

module.exports = buildProviderMiddleware
