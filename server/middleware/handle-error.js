'use strict'

const handleError = (logger) => (err, req, res, next) => {
  if (err) {
    logger.error(err)
    res.status(500).send({ message: 'Jackal was fatally wounded' })
  } else {
    next()
  }
}

module.exports = handleError
