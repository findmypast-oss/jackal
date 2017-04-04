'use strict'

const fs = require('fs')
const hashData = require('./hash-data')
const loki = require('lokijs')
const every = require('lodash.every')

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
  const consumer = Object.keys(contracts)[0]

  return every(contracts[consumer], (provider, providerName) => {
    return every(provider, (api, apiName) => {
      return every(api, insertProviderContract.bind(this, consumer, providerName, apiName))
    })
  })

  function insertProviderContract (consumer, providerName, apiName, scenario, scenarioName) {
    const name      = `${providerName}/${apiName}/${scenarioName}`
    const contract  = {}
    contract[consumer] = {}
    contract[consumer][providerName] = {}
    contract[consumer][providerName][apiName] = {}
    contract[consumer][providerName][apiName][scenarioName] = scenario
    const json      = JSON.stringify(contract)
    const hash      = hashData(json)

    if (!this.cached(providerName, hash)) {
      const collection = this.getCollection(providerName)
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
