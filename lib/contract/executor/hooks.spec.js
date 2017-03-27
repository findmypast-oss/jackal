'use strict'

const tap = require('tap')
const test = tap.test

const hooks = require('./hooks')

test('hooks.requestFunctions', t => {
  t.plan(2)

  let contract = {
    before: [
      {url: 'URL',method: 'PUT',timeout: 20000}
    ]
  }
  let expected = ["request({method:'PUT',uri:'URL',timeout:20000}, done)"]
  t.same(hooks.requestFunctions(contract), expected)

  contract = {
    before: [
      {url: 'URL',method: 'PUT',timeout: 20000},
      {url: 'URL1',method: 'POST',timeout: 20001},
      {url: 'URL2',method: 'GET',timeout: 20002},
      {url: 'URL3',method: 'DELETE',timeout: 20003}
    ]
  }
  expected = [
    "request({method:'PUT',uri:'URL',timeout:20000}, cb1)",
    "const cb1 = request({method:'POST',uri:'URL1',timeout:20001}, cb2)",
    "const cb2 = request({method:'GET',uri:'URL2',timeout:20002}, cb3)",
    "const cb3 = request({method:'DELETE',uri:'URL3',timeout:20003}, done)"
  ]
  t.same(hooks.requestFunctions(contract), expected)

})

test('hooks.beforeHookBody', t => {
  t.plan(1)

  const contract = {
    before: [
      {url: 'URL',method: 'PUT',timeout: 20000},
      {url: 'URL1',method: 'POST',timeout: 20001},
      {url: 'URL2',method: 'GET',timeout: 20002},
      {url: 'URL3',method: 'DELETE',timeout: 20003}
    ]
  }
  const expected = `const request = require('request')
request({method:'PUT',uri:'URL',timeout:20000}, cb1)
const cb1 = request({method:'POST',uri:'URL1',timeout:20001}, cb2)
const cb2 = request({method:'GET',uri:'URL2',timeout:20002}, cb3)
const cb3 = request({method:'DELETE',uri:'URL3',timeout:20003}, done)`

  t.same(hooks.beforeHookBody(contract), expected)

})
