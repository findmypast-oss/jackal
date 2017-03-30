const consumer = require('../../../client')

function send(options, done) {
  consumer.send(
    options.filePath,
    'http://localhost:25863/api/contracts',
    true,
    assert(options.isPass, done)
  )
}

function run(options, done) {
  consumer.run(
    'http://localhost:25863/api/contracts/' + options.provider,
    true,
    assert(options.isPass, done)
  )
}

function assert(isPass, done) {
  return function(err, results) {
    if(isPass) {
      expect(err).to.not.exist
      expect(results[0].status).to.equal('Pass')
    } else {
      expect(err).to.exist
      expect(results[0].status).to.equal('Fail')
    }
    done()
  }
}

module.exports = { run, send }
