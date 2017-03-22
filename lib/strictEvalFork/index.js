/*

  This code is currently an almost exact copy of the 'strict-eval' npm package.
  Investigation into whether returning the value from vm.runInNewContext opens
  us up to vulnerabilities needs to take place and be understood before we can
  commit to using this package in place of a DSL.

*/

// MIT License

"use strict"

var vm = require("vm")

const getGlobalAsObject = () => {
  var sandbox = {}

  var keys = Object.keys(global)
  for (var i = 0, ii = keys.length; i < ii; i++) {
      var key = keys[i]
      sandbox[key] = global[key]
  }

  sandbox["require"] = require

  return sandbox
}

const strictify = code => {
  var strictRegExp = /["']use strict["']/

  if (strictRegExp.test(code)) {
      return code
  }

  return '"use strict";\n' + code
}

module.exports = (code, sandbox, options) => {
  const defaultSandbox = sandbox ? sandbox : getGlobalAsObject()
  const defaultOptions = options ? options : {}
  const strictCode = strictify(code)

  return vm.runInNewContext(strictCode, defaultSandbox, defaultOptions)
}
