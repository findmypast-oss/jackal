'use strict'

const cache = require('./cache')
const execute = require('./executor')
const hashData = require('./hasher')
const mapResult = require('./resultMapper')
const parseResponse = require('./responseParser')
const validate = require('./validator')

const cached = cache.cached
const dump = cache.dump
const insert = cache.insert
const retrieve = cache.retrieve
const retrieveCollection = cache.retrieveCollection

module.exports = { cached, dump, execute, hashData, insert, mapResult, parseResponse, retrieve, retrieveCollection, validate }
