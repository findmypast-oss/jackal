'use strict'

const _ = require('lodash')
const hyperid = require('hyperid')
const instance = hyperid()

module.exports = (body) => _.template(body)({ unique_id: instance() })
