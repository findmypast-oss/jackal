'use strict'

const fs = require('fs')
const hashData = require('../contract/hasher')
const loki = require('lokijs')

var DB = function (config) {
  try {
    const dbJson = fs.readFileSync(config.path, 'utf8')
    this.db = new loki(config.path)
    this.db.loadJSON(dbJson)
  } catch (e) {
    this.db = new loki(config.path, { autosave: true, autosaveInterval: 60000 })
  }
}

DB.prototype.cached = function (coll, hash) {
  return this.retrieve(coll, hash) !== null
}

DB.prototype.dump = function () {
  return this.db.serialize()
}

DB.prototype.getCollection = function (name) {
  const collection = this.db.getCollection(name)

  return collection === null ? this.db.addCollection(name) : collection
}

DB.prototype.insert = function (coll, hash, contracts) {
  return this.insertForConsumer(coll, hash, contracts) && this.insertForProviders(contracts)
}

DB.prototype.insertForConsumer = function (coll, hash, contracts) {
  const collection = this.getCollection(coll)
  const doc = { hash: hash, contracts: contracts }

  return collection.insertOne(doc) !== undefined
}

DB.prototype.insertForProviders = function (contracts) {
  return contracts.every(insertProviderContract.bind(this))

  function insertProviderContract (contract) {
    const ident     = contract.name.split('/')
    const provider  = ident[0]
    const name      = ident[1]

    contract    = Object.assign({}, contract, { name: name })
    const json  = JSON.stringify(contract)
    const hash  = hashData(json)

    if (!this.cached(provider, hash)) {
      const collection = this.getCollection(provider)
      this.removeDuplicateContracts(collection, name, contract.consumer)
      const doc = {
        hash: hash,
        name: name,
        consumer: contract.consumer,
        contract: contract
      }

      return collection.insertOne(doc) !== undefined
    }

    return true
  }
}

DB.prototype.removeDuplicateContracts = function (collection, name, consumer) {
  const query = { 'name' : { '$eq' : name }, 'consumer' : { '$eq' : consumer } }
  collection.findAndRemove(query)
}

DB.prototype.retrieve = function (coll, hash) {
  const collection = this.getCollection(coll)

  return collection.findOne({ 'hash' : { '$eq' : hash } })
}

DB.prototype.retrieveCollection = function (coll) {
  const collection = this.getCollection(coll)

  /* FILTH */
  return collection.find({ 'hash' : { '$ne' : null } })
}

module.exports = DB
