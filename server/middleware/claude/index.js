'use strict'

const { execute, retrieveCollection } = require('../../../lib/contract')

const claude = (req, res, next) => {
  const provider = req.params.provider

  const contracts = retrieveCollection(provider)
  console.log(contracts)

  if (contracts.length === 0) {
    res.send('No contracts exist for provider')
    next()
  } else {
    execute(contracts, (err, results) => {
      if (results.every(r => r.err === null)) {
        res.status(200).send('Contracts executed successfully')
        next()
      } else {
        res.status(400).send('Contracts failed to execute')
        next()
      }
    })
  }
}

module.exports = claude
