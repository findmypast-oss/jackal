'use strict'

const buildConsumerMiddleware = (db, json, grapher) => {
  return [
    json,
    require('../validation/single-consumer'),
    require('../validation/contracts'),
    require('../validation/malformed-contract'),
    require('../validation/unsupported-contract'),
    require('../db/insert')(db),
    require('./execute')(db, grapher)
  ]
}

module.exports = buildConsumerMiddleware
