'use strict'

const createValidateNoProviderContracts = (db) => (req, res, next) => {
  const provider = req.params.provider
  const contracts = db.retrieveCollection(provider).map(dbo => dbo.contract)

  if (contracts.length === 0) {
    res.status(200).send(buildMessage(provider))
  } else {
    next()
  }
}

module.exports = createValidateNoProviderContracts

const buildMessage = function (provider) {
  return { message: `No contracts exist for provider: ${provider}` }
}
