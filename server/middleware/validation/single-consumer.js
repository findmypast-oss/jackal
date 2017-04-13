'use strict'

const validateSingleConsumer = (req, res, next) => {
  const contracts = req.body

  if (contracts && typeof contracts === 'object' && Object.keys(contracts).length === 1) {
    next()
  } else {
    const body = {
      message: 'Contract object must contain a single consumer',
      status: 'INVALID',
      results: []
    }

    res.status(400).send(body)
  }
}

module.exports = validateSingleConsumer
