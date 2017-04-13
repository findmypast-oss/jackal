'use strict'

const buildConsumerMiddleware = (db, json) => {
  return [
    json,
    require('../validation/single-consumer'),
    require('../validation/contracts'),
    require('../validation/malformed-contract'),
    require('../validation/unsupported-contract'),
    require('./execute'),
    require('../db/insert')(db)
  ]
}

module.exports = buildConsumerMiddleware
