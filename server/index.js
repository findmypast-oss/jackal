'use strict'

const express = require('express')

const { cached, execute, hashContracts, insert, retrieve, validate } = require('../lib/contract')

const logging = require('./middleware/logging')
const bodyParser = require('body-parser')

const app = express()

app.use(logging)
app.use(bodyParser.json())

app.get('/health', function (req, res) {
  res.send('😊')
})

app.post('/api/contracts', function (req, res, next) {
  const contracts = req.body

  if (contracts.length === 0) {
    res.status(400).send('No contracts received')
    next()
  }

  const json = JSON.stringify(contracts)
  const hash = hashContracts(json)

  if (!cached(hash)) {
    const validations = contracts.map(validate)

    if (!validations.every(v => v.valid)) {
      res.status(400).send(validations)
      next()
    }

    if (!insert(hash, contracts)) {
      res.status(500).send('Cache failed on contracts insertion')
      next()
    }
  }

  const cacheObject = retrieve(hash)

  if (cacheObject.hash !== hash) {
    res.status(500).send('Cache failed on contracts retrieval')
    next()
  }

  execute(cacheObject.contracts, (err, results) => {
    if (err) {
      res.status(400).send('Contracts could not be executed')
      next()
    } else {
      res.status(201).send('Contracts executed')
      next()
    }
  })
})

app.listen(25863)
