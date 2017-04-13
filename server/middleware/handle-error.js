'use strict'

const handleError = (logger) => (err, req, res, next) => {
  if (err) {
    logger.error(err)

    const body = {
      message: 'Jackal was fatally wounded',
      status: 'ERROR',
      results: []
    }

    res.status(500).send()
  } else {
    next()
  }
}

module.exports = handleError
