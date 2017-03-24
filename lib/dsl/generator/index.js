'use strict'

const Joi = require('joi')
const { parseAllowTokens, sanitiseAllowValue } = require('./allow')
const parseKeyValuePair = require('./keyValuePair')

const generators = {
  '[': generateArray,
  '{': generateObject,
  "'": generateStatement
}

const generate = tokens => generators[tokens[0][0]](tokens[0])

module.exports = generate

function generateArray (tokens) {
  const { head, tail } = parseListTokens(tokens)

  let array = [ generate(head) ]

  if (tail) {
    array = tail.map(item => generate(item[2])).concat(array)
  }

  return Joi.array().items(array)
}

function generateObject (tokens) {
  const { head, tail } = parseListTokens(tokens)
  let { key, expr } = parseKeyValuePair(head)

  const schema = {}
  schema[key] = generate(expr)

  if (tail) {
    tail.forEach(tc => {
      let { key, expr } = parseKeyValuePair(tc[2])
      schema[key] = generate(expr)
    })
  }

  return Joi.object(schema).unknown(true)
}

function generateStatement (tokens) {
  const { mod, term, allow } = parseStatementTokens(tokens)

  let func = types[term]

  if (isRequired(mod)) func = func.required()
  if (isOptional(mod)) func = func.optional()

  if (allow) {
    const { head, tail } = parseAllowTokens(allow[0])

    func = func.allow(sanitiseAllowValue(head))
    func = tail.reduce((acc, item) => {
      return acc.allow(sanitiseAllowValue(item[2][0]))
    }, func)
  }

  return func
}

/* Utilities */

const types = {
  boolean: Joi.boolean(),
  date: Joi.date(),
  date_iso: Joi.date().iso(),
  integer: Joi.number().integer(),
  real: Joi.number(),
  string: Joi.string().allow(''),
  string_email: Joi.string().email().allow(''),
  string_guid: Joi.string().guid().allow('')
}

const isOptional = mod => mod && mod[0][0] === '?'
const isRequired = mod => mod && mod[0][0] === '!'

const parseStatementTokens = tokens => {
  return { mod: tokens[1], term: tokens[2][0][0], allow: tokens[3] }
}

const parseListTokens = tokens => {
  return { head: tokens[2][0], tail: tokens[2][1] }
}
