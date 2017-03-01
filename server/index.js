'use strict'

const express = require('express')

const { cache, validate } = require('../contract')

const logging = require('./middleware/logging')
const bodyParser = require('body-parser')

const app = express()

app.use(logging)
app.use(bodyParser.json())

app.get('/health', function (req, res) {
  res.send('😊')
})

app.post('/api/contracts', function (req, res) {
  const { hash, contracts } = req.body

  const contractCache = cache.getCollection('contracts')
  if (!contractCache.findOne({ 'hash' : { '$eq' : hash } })) {
    const validations = contracts.map(validate)
  }

})

app.listen(25863)
