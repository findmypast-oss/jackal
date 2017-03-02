'use strict'

const express = require('express')

const { cached, execute, hash, insert, retrieve, validate } = require('../lib/contract')

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

  const hash = hash(contracts)

  if (!cached(hash)) {
    const validations = contracts.map(validate)

    if (!validations.every(v => v.valid)) {
      res.status(400).send(validations)
      next()
    }

    if (!insert(hash, contracts)) {
      res.status(500).send('Internal Server Error')
      next()
    }
  }

  const validatedContracts = retrieve(hash)

  if (execute(validatedContracts)) {
    res.status(201).send('Contracts Executed')
    next()
  } else {
    res.status(400).send('Contracts Could Not Be Executed')
    next()
  }
})

app.listen(25863)
