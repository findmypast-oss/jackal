'use strict'

const { execute, mapResult, retrieveCollection } = require('../../../lib/contract')

const claude = (req, res, next) => {
  const provider = req.params.provider
  const contracts = retrieveCollection(provider).map(co => co.contract)

  if (contracts.length === 0) {
    res.status(200).send({ message: `No contracts exist for provider: ${provider}` })

    return next()
  } else {
    execute(contracts, (err, results) => {
      res.status(200).send(results.map(mapResult))

      return next()
    })
  }
}

module.exports = claude
