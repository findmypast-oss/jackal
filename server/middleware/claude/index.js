'use strict'

const { execute, retrieveCollection } = require('../../../lib/contract')

const claude = (req, res, next) => {
  const provider = req.params.provider
  const contracts = retrieveCollection(provider).map(co => co.contract)

  if (contracts.length === 0) {
    res.status(200).send(`No contracts exist for provider: ${provider}`)
  } else {
    execute(contracts, (err, results) => {
      if (results.every(r => r.err === null)) {
        res.status(200).send(`Contracts executed successfully for provider ${provider}`)
      } else {
        res.status(400).send(`Contracts failed to execute for provider ${provider}`)
      }
    })
  }

  return next()
}

module.exports = claude
