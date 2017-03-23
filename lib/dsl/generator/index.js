'use strict'

const Joi = require('joi')

const generators = {
  '[': generateArray,
  '{': generateObject,
  '"': generateStatement
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
    const { head, tail } = parseAllowTokens(allow)
    func = func.allow(sanitiseValue(head))
    func = tail.reduce((acc, item) => acc.allow(sanitiseValue(item[2])), func)
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

const parseAllowTokens = tokens => {
  return { head: tokens[0][1][0][0][0], tail: tokens[0][1][1] }
}

const sanitiseValue = value => {
  switch (value) {
    case 'NULL':      return null
    case 'UNDEFINED': return undefined
    default:          return value
  }
}

const parseKeyValuePair = kvp => { return { key: parseKey(kvp), expr: kvp[4] } }
const parseKey = kvp => kvp[0][1].join('')

const parseListTokens = tokens => {
  return { head: tokens[2][0], tail: tokens[2][1] }
}
