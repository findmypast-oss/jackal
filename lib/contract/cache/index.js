'use strict'

const loki = require('lokijs')

const cache = new loki('contracts.json', {
  autosave: true,
  autosaveInterval: 60000,
  autoload: true,
  autoloadCallback: cacheLoadHandler
})

const cacheLoadHandler = () => {
  if (cache.getCollection('contracts') === null)
    cache.addCollection('contracts')
}

module.exports = cache
