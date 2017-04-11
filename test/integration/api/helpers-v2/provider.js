'use strict'

const express = require('express')

var Provider = function () {
  this.server = null
}

Provider.prototype.start = function (options, done) {
  const app = express()

  app.get('/api/user', (req, res) => {
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ]
    res.status(200).json(users)
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

  this.server = app.listen(options.port, (err) => { if (err) { done(err) } done() })
}

Provider.prototype.stop = function (done) {
  if (this.server) { return this.server.close(done) }
  return done()
}

module.exports = Provider
