'use strict'

const hashData = require('../hasher')
const loki = require('lokijs')

const cache = new loki('contracts.json', {
  autosave: true,
  autosaveInterval: 60000,
  autoload: true,
  autoloadCallback: () => { if (cache.getCollection('contracts') === null) cache.addCollection('contracts') }
})

const cached = (coll, hash) => {
  return retrieve(coll, hash) !== null
}

const dump = (callback) => {
  return cache.serialize()
}

const insert = (coll, hash, contracts) => {
  return insertConsumerContracts(coll, hash, contracts) && insertProviderContracts(contracts)
}

const retrieve = (coll, hash) => {
  const collection = getCollection(coll)

  return collection.findOne({ 'hash' : { '$eq' : hash } })
}

const retrieveCollection = (coll) => {
  const collection = getCollection(coll)

  /* FILTH */
  return collection.find({ 'hash' : { '$ne' : null } })
}

module.exports = { cached, dump, insert, retrieve, retrieveCollection }

const getCollection = name => {
  const collection = cache.getCollection(name)

  return collection === null ? cache.addCollection(name) : collection
}

const insertConsumerContracts = (coll, hash, contracts) => {
  const collection = getCollection(coll)

  return collection.insertOne({ hash: hash, contracts: contracts }) !== undefined
}

const insertProviderContracts = (contracts) => {
  return contracts.every(contract => {
    const ident     = contract.name.split(' | ')
    const name      = ident[0]
    const provider  = ident[1]

    contract    = Object.assign({}, contract, { name: name })
    const json  = JSON.stringify(contract)
    const hash  = hashData(json)

    if (!cached(provider, hash)) {
      const collection = getCollection(provider)

      return collection.insertOne({ hash: hash, contract: contract }) !== undefined
    }

    return true
  })
}
