'use strict'

const logging = require('./middleware/logging')
const express = require('express')

const app = express()

app.use(logging)

app.get('/health', function (req, res) {
  res.send('😊')
})

app.listen(25863)
