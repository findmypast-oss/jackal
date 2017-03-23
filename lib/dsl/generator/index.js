'use strict'

const Joi = require('joi')

const generate = tokens => {
  /* Consider better way to match type of expression */
  const generators = {
    '[': generateArray,
    '{': generateObject,
    '"': generateStatement
  }

  return generators[tokens[0]](tokens)
}

module.exports = generate

/* Array Generation */

const generateArray = tokens => {
  return tokens
}

/* Object Generation */

const generateObject = tokens => {
  const kvps = tokens[2]

  const head = kvps[0]
  const key = head[0][1].join('')
  const expr = head[4]

  const schema = {}
  schema[key] = generate(expr)

  return Joi.object(schema).unknown(true)
}

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

const generateStatement = tokens => {
  const { mod, term, allow } = parseStatementTokens(tokens)

  let func = types[term]

  if (isRequired(mod)) func = func.required()
  if (isOptional(mod)) func = func.optional()

  if (allow) {
    const allowClauses = allow[0][1]

    const head = allowClauses[0][0][0]
    func = func.allow(sanitiseValue(head))

    const tail = allowClauses[1]
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

const sanitiseValue = value => {
  switch (value) {
    case 'NULL':      return null
    case 'UNDEFINED': return undefined
    default:          return value
  }
}
