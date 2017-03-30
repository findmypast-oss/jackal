const async = require('async')
const provider = require('./support/provider')
const jackal = require('./support/jackal')
const consumer = require('./support/client')

describe('Jackal database dump and recovery', function() {
  var server = null

  before(function(done) {
    jackal.start(done)
  })

  after(function(done) {
    async.parallel([jackal.stop, provider.stop], done)
  })

  it('The provider should start successfully', function(done){
    provider.start({
      port: 5000,
      contract: { version: '1' }
    }, done)
  })

  it('Sending contract-v1 the first time should pass', function(done) {
    consumer.send('test/integration/contract-v1.json', true, done)
  })

  it('Should successfully dump the database to file', function(done){
    done()
  })
})
