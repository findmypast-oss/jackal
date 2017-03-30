const consumer = require('../../client')

function send(filepath, expectPass, done) {
  consumer.send(
    filepath,
    'http://localhost:25863/api/contracts',
    true,
    assert.bind(null, expectPass, done)
  )
}

function run(providerName, expectPass, done) {
  consumer.run(
    'http://localhost:25863/api/contracts/' + providerName,
    true,
    assert.bind(null, expectPass, done)
  )
}

function assert(expectPass, done, err, results){
  if(expectPass) {
    expect(err).to.not.exist
    expect(results[0].status).to.equal('Pass')
  } else {
    expect(err).to.exist
    expect(results[0].status).to.equal('Fail')
  }
  done()
}

module.exports = { run, send }
