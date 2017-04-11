'use strict'

const buildConsumerMiddleware = (db, json) => {
  return [
    json,
    require('../validation/single-consumer'),
    require('../validation/contracts'),
    require('../validation/malformed-contract'),
    require('../validation/unsupported-contract'),
    require('../db/insert')(db),
    require('./execute')(db)
  ]
}

module.exports = buildConsumerMiddleware
