module.exports = function(done) {
  return function standardParser(err, response, body) {
    if (err) {
      return done(err)
    }

    return done(null, body)
  }
}
