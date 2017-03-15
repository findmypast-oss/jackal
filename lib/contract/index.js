'use strict'

const { cached, dump, insert, retrieve, retrieveCollection } = require('./cache')
const execute = require('./executor')
const hashData = require('./hasher')
const Contract = require('./object')
const validate = require('./validator')

module.exports = { Contract, cached, dump, execute, hashData, insert, retrieve, retrieveCollection, validate }
