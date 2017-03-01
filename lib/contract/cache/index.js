'use strict'

const loki = require('lokijs')

const cache = new loki('contracts.json', {
  autosave: true,
  autosaveInterval: 60000,
  autoload: true,
  autoloadCallback: () => { if (cache.getCollection('contracts') === null) cache.addCollection('contracts') }
})

const cached = hash => {
  return retrieve(hash) !== null
}

const insert = (hash, contracts) => {
  const contractCache = cache.getCollection('contracts')

  return contractCache.insertOne({ hash: hash, contracts: contracts }) !== undefined
}

const retrieve = (hash) => {
  const contractCache = cache.getCollection('contracts')

  return contractCache.findOne({ 'hash' : { '$eq' : hash } })
}

module.exports = { cached, insert, retrieve }
