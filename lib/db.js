'use strict'

const fs = require('fs')
const hashData = require('./hash-data')
const loki = require('lokijs')
const every = require('lodash.every')
const flattenDeep = require('lodash/flattenDeep')
const uniq = require('lodash.uniq')

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

DB.prototype.getAPIsByConsumer = function (consumer) {
  const providers = this.getProvidersByConsumer(consumer)
  const nestedAPIs = providers.map(this.getAPIsByProvider.bind(this))

  return nestedAPIs.length === 0 ? [] : uniq(flattenDeep(nestedAPIs))
}

DB.prototype.getAPIsByConsumerAndProvider = function (consumer, provider) {
  return this.retrieveCollection(provider)
    .filter(dbo => dbo.consumer === consumer)
    .map(dbo => dbo.api)
}

DB.prototype.getAPIsByProvider = function (provider) {
  return this.retrieveCollection(provider).map(dbo => dbo.api)
}

DB.prototype.getCollection = function (name) {
  const collection = this.db.getCollection(name)

  return collection === null ? this.db.addCollection(name) : collection
}

DB.prototype.getConsumers = function () {
  return this.retrieveCollection('contracts').map(dbo => dbo.consumer)
}

DB.prototype.getConsumersByProvider = function (provider) {
  return uniq(this.retrieveCollection(provider).map(dbo => dbo.consumer))
}

DB.prototype.getProviders = function () {
  const providers = this.getConsumers()
    .map(this.getProvidersByConsumer.bind(this))

  return uniq(flattenDeep(providers))
}

DB.prototype.getProvidersByConsumer = function (consumer) {
  const dbo = this.retrieveCollection('contracts')
    .filter(dbo => dbo.consumer === consumer)

  return dbo.length === 0 ? [] : dbo[0].providers
}

DB.prototype.insert = function (coll, hash, contracts) {
  return this.insertForConsumer(coll, hash, contracts) && this.insertForProviders(contracts)
}

DB.prototype.insertForConsumer = function (coll, hash, contracts) {
  const collection = this.getCollection(coll)
  const consumer = Object.keys(contracts)[0]
  const providers = Object.keys(contracts[consumer])
  this.removeDuplicateContracts(collection, { 'hash' : { '$eq' : hash } })

  const doc = {
    hash: hash,
    consumer: consumer,
    providers: providers,
    contracts: contracts
  }

  return collection.insertOne(doc) !== undefined
}

DB.prototype.insertForProviders = function (contracts) {
  const consumer = Object.keys(contracts)[0]

  return every(contracts[consumer], (provider, providerName) => {
    return every(provider, (api, apiName) => {
      return every(api, insertProviderContract.bind(this, consumer, providerName, apiName))
    })
  })

  function insertProviderContract (consumer, provider, api, scenario, scenarioName) {
    const name = `${provider}/${api}/${scenarioName}`
    const contract = buildContract(consumer, provider, api, scenarioName, scenario)
    const hash = hashData(JSON.stringify(contract))

    if (!this.cached(provider, hash)) {
      const collection = this.getCollection(provider)
      this.removeDuplicateContracts(collection, { '$and' : [{ 'name' : { '$eq' : name }, 'consumer' : { '$eq' : consumer } }]})

      const doc = {
        hash: hash,
        name: name,
        consumer: consumer,
        provider: provider,
        api: api,
        contract: contract
      }

      return collection.insertOne(doc) !== undefined
    }

    return true
  }
}

DB.prototype.removeDuplicateContracts = function (collection, by_filter) {
  const query = by_filter
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

const buildContract = (consumer, provider, api, name, scenario) => {
  const contract  = {}
  contract[consumer] = {}
  contract[consumer][provider] = {}
  contract[consumer][provider][api] = {}
  contract[consumer][provider][api][name] = scenario

  return contract
}
