'use strict'

const express = require('express')
const bodyParser = require('body-parser')

var Provider = function () {
  this.server = null
}

Provider.prototype.start = function (options, done) {
  const app = express()
  app.use(bodyParser.json())

  app.get('/api/user', (req, res) => {
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ]
    res.status(200).json(users)
  })

  app.post('/api/user', (req, res) => {
    if (req.body.email.startsWith('<%= hyperid %>')) {
      res.status(400).send({ message: 'Email Address In Use' })
    } else {
      res.status(201).send({ id: 1, email: req.body.email })
    }
  })

  app.get('/api/user/:id', (req, res) => {
    if (req.params.id === '1') {
      res.status(200).send({ id: 1, name: 'John Doe' })
    } else {
      res.status(404).send('Not Found')
    }
  })

  app.get('/api/user/:id/delete', (req, res) => {
    if (req.params.id === '1') {
      res.status(200).end()
    } else {
      res.status(404).send('Not Found')
    }
  })

  app.get('/api/user/:id/restore', (req, res) => {
    if (req.params.id === '1') {
      res.status(200).send({ id: 1, name: 'John Doe' })
    } else {
      res.status(404).send('Not Found')
    }
  })

  app.get('/api/receipt/:id', (req, res) => {
    const receipt = { id: req.params.id, item: 'item', amount: '1.99' }
    res.status(200).json(receipt)
  })

  app.get('/api/product', (req, res) => {
    const products = [
      { id: 1, name: 'Crutch', description: 'Walking Aid' },
      { id: 2, name: 'Jackal', description: 'Wild Animal' }
    ]
    res.status(200).json(products)
  })

  this.server = app.listen(options.port, done)
}

Provider.prototype.stop = function (done) {
  if (this.server) { return this.server.close(done) }
  return done()
}

module.exports = Provider
