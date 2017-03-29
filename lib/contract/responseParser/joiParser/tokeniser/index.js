'use strict'

let parensOpen = 0
let bracksOpen = 0
let bracesOpen = 0

const tokenise = value => {
  let tokens = []
  let token = ''

  let chars = value.split('')
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === '(') parensOpen++
    if (chars[i] === ')') parensOpen--
    if (chars[i] === '[') bracksOpen++
    if (chars[i] === ']') bracksOpen--
    if (chars[i] === '{') bracesOpen++
    if (chars[i] === '}') bracesOpen--

    if (chars[i] === '.' && atRootLevel()) {
      tokens.push(token.toString())
      token = ''
      continue
    }

    token = token.concat(chars[i])
  }

  tokens.push(token)

  return tokens
}

module.exports = tokenise

const atRootLevel = () => {
  return parensOpen === 0 && bracksOpen === 0 && bracesOpen === 0
}
