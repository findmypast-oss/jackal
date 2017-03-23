'use strict'

const Joi = require('joi')

/* Consider better way to match type of expression */
const generators = {
  '[': generateArray,
  '{': generateObject,
  '"': generateStatement
}

const generate = tokens => {
  return generators[tokens[0][0]](tokens[0])
}

module.exports = generate

/* Array Generation */

function generateArray (tokens) {
  const { head, tail } = parseArrayTokens(tokens)
  let expr = parseArrayHead(head)

  const array = []
  array.push(generate(expr))

  if (tail) {
    tail.map(tc => tc[2]).forEach(tc => {
      /* eslint-disable no-console */
      console.error('\n')
      console.error(tc)
      /* eslint-enable no-console */
    })
  }

  return Joi.array().items(array)
}

const parseArrayTokens = arrayTokens => {
  return {
    head: arrayTokens[0][2][0],
    tail: arrayTokens[0][2][1]
  }
}

const parseArrayHead = arrayHead => arrayHead[2][1][1]

/* Object Generation */

function generateObject (tokens) {
  const { head, tail } = parseObjectTokens(tokens)
  let { key, expr } = parseKeyValuePair(head)

  const schema = {}
  schema[key] = generate(expr)

  if (tail) {
    tail.map(tc => tc[2]).forEach(tc => {
      let { key, expr } = parseKeyValuePair(tc)
      schema[key] = generate(expr)
    })
  }

  return Joi.object(schema).unknown(true)
}

const parseObjectTokens = objectTokens => {
  return {
    head: objectTokens[2][0],
    tail: objectTokens[2][1]
  }
}

const parseKeyValuePair = kvp => {
  return {
    key: parseKey(kvp),
    expr: kvp[4]
  }
}

const parseKey = kvp => kvp[0][1].join('')

/* Statement Generation */

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

function generateStatement (tokens) {
  const { mod, term, allow } = parseStatementTokens(tokens)

  let func = types[term]

  if (isRequired(mod)) func = func.required()
  if (isOptional(mod)) func = func.optional()

  if (allow) {
    const { head, tail } = parseAllowTokens(allow)

    func = func.allow(sanitiseValue(head))
    tail.forEach(tc => { func = func.allow(sanitiseValue(tc[2])) })
  }

  return func
}

const isOptional = mod => mod && mod[0][0] === '?'
const isRequired = mod => mod && mod[0][0] === '!'

const parseStatementTokens = statementTokens => {
  return {
    mod: statementTokens[1],
    term: statementTokens[2][0][0],
    allow: statementTokens[3]
  }
}

const parseAllowTokens = allowTokens => {
  return {
    head: allowTokens[0][1][0][0][0],
    tail: allowTokens[0][1][1]
  }
}

const sanitiseValue = value => {
  switch (value) {
    case 'NULL':      return null
    case 'UNDEFINED': return undefined
    default:          return value
  }
}
