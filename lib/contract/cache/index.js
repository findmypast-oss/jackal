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

const dump = () => {
  return cache.serialize()
}

const insert = (coll, hash, contracts) => {
  return insertForConsumer(coll, hash, contracts) && insertForProviders(contracts)
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

const insertForConsumer = (coll, hash, contracts) => {
  const collection = getCollection(coll)
  const doc = { hash: hash, contracts: contracts }

  return collection.insertOne(doc) !== undefined
}

const insertForProviders = (contracts) => {
  return contracts.every(contract => {
    const ident     = contract.name.split('/')
    const provider  = ident[0]
    const name      = ident[1]

    contract    = Object.assign({}, contract, { name: name })
    const json  = JSON.stringify(contract)
    const hash  = hashData(json)

    if (!cached(provider, hash)) {
      const collection = getCollection(provider)
      removeDuplicateContracts(collection, name, contract.consumer)
      const doc = {
        hash: hash,
        name: name,
        consumer: contract.consumer,
        contract: contract
      }

      return collection.insertOne(doc) !== undefined
    }

    return true
  })
}

const removeDuplicateContracts = (collection, name, consumer) => {
  const query = { 'name' : { '$eq' : name }, 'consumer' : { '$eq' : consumer } }
  collection.findAndRemove(query)
}
