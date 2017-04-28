'use strict'

// const _ = require('lodash')
// const jp = require('jsonpath')
const request = require('request')
const buildUrl = require('../build-url')

const shouldBeJson = (body) => Array.isArray(body) || typeof body === 'object'
const sanitiseBody = (body) => shouldBeJson(body) ? JSON.stringify(body) : body

module.exports = (hook) => (done) => {
  const url = hook.baseUrl
    ? buildUrl(hook.baseUrl, hook.path, hook.query)
    : hook.url

  const requestParameter = {
    method: hook.method,
    url: url,
    timeout: hook.timeout,
    headers: hook.headers,
    body: sanitiseBody(hook.body)
  }

  request(requestParameter, (err) => {
    if (err) { return done(err) }

    // if (hook.response) {
    //   const result = _.mapValues(hook.response, (value) => {
    //     return body.query(value)
    //   })
    //
    //   return done(null, result)
    // }

    return done()
  })
}
