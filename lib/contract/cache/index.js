'use strict'

const hashData = require('../hasher')
const loki = require('lokijs')

const cache = new loki('contracts.json', {
  autosave: true,
  autosaveInterval: 60000,
  autoload: true,
  autoloadCallback: function () { if (cache.getCollection('contracts') === null) cache.addCollection('contracts') }
})

const cached = function (coll, hash) {
  return retrieve(coll, hash) !== null
}

const dump = function () {
  return cache.serialize()
}

const insert = function (coll, hash, contracts) {
  return insertForConsumer(coll, hash, contracts) && insertForProviders(contracts)
}

const retrieve = function (coll, hash) {
  const collection = getCollection(coll)

  return collection.findOne({ 'hash' : { '$eq' : hash } })
}

const retrieveCollection = function (coll) {
  const collection = getCollection(coll)

  /* FILTH */
  return collection.find({ 'hash' : { '$ne' : null } })
}

module.exports = { cached, dump, insert, retrieve, retrieveCollection }

const getCollection = function (name) {
  const collection = cache.getCollection(name)

  return collection === null ? cache.addCollection(name) : collection
}

const insertForConsumer = function (coll, hash, contracts) {
  const collection = getCollection(coll)
  const doc = { hash: hash, contracts: contracts }

  return collection.insertOne(doc) !== undefined
}

const insertForProviders = function (contracts) {
  return contracts.every(function (contract) {
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

const removeDuplicateContracts = function (collection, name, consumer) {
  const query = { 'name' : { '$eq' : name }, 'consumer' : { '$eq' : consumer } }
  collection.findAndRemove(query)
}
