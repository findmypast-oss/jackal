'use strict'

const createDump = (db) => {
  return function (req, res, next) {
    res.status(200).send(db.dump())

    return next()
  }
}

module.exports = createDump
