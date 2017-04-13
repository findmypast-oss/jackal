'use strict'

const createValidateNoProviderContracts = (db) => (req, res, next) => {
  const provider = req.params.provider
  const contracts = db.retrieveCollection(provider).map(dbo => dbo.contract)

  if (contracts.length === 0) {
    const body = {
      message: `No contracts exist for provider: ${provider}`,
      status: 'NO_CONTRACTS',
      results: []
    }

    res.status(200).send(body)
  } else {
    next()
  }
}

module.exports = createValidateNoProviderContracts
