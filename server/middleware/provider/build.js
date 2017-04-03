'use strict'

const buildProviderMiddleware = (db, json) => {
  return [
    json,
    require('../validation/no-provider-contracts')(db),
    require('./execute')(db)
  ]
}

module.exports = buildProviderMiddleware
