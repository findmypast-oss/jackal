'use strict'

const noContracts = (req, res, next) => {
  const contracts = req.body

  if (contracts.length === undefined || contracts.length === 0) {
    res.status(400).send({ message: 'No contracts received' })
  } else {
    next()
  }
}

module.exports = noContracts
