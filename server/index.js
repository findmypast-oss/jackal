'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const logging = require('./middleware/logging')
const jackal = require('./middleware/jackal')
const crutch = require('./middleware/crutch')

const app = express()

app.use(logging)
app.use(bodyParser.json())

app.get('/health', function (req, res) { res.send('😊') })
app.post('/api/contracts', jackal)
app.get('/api/contracts', crutch)

app.listen(25863)
