'use strict'

const express = require('express')

const logging = require('./middleware/logging')
const jackal = require('./middleware/jackal')
const bodyParser = require('body-parser')

const app = express()

app.use(logging)
app.use(bodyParser.json())

app.get('/health', function (req, res) {
  res.send('😊')
})

app.post('/api/contracts', jackal)

app.listen(25863)
