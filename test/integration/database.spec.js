const provider = require('./support/provider')
const jackal = require('./support/jackal')
const client = require('./support/client')

describe('Database tests', function() {

  before(jackal.start)
  after(jackal.stop)
  after(provider.stop)

  it('The provider should start successfully', function(done){
    provider.start({ port: 5000, contract: { version: '1' } }, done)
  })

  it('Sending contract-v1 the first time should pass', function(done) {
    client.send({
      filePath: 'test/integration/contract-v1.json',
      isPass: true
    }, done)
  })

  it('The database is saved to the local file system', function(done) {
    client.dump({ filePath: 'test/integration/db.json' }, done)
  })

  it('Jackal stops successfully', function(done) {
    jackal.stop(done)
  })

  it('Jackal starts with no contracts', function(done) {
    jackal.start(done)
  })

  xit('Running the v1 contract fails because it does not exist', function(done) {
    done("Not implemented")
  })

  xit('Jackal stops successfully', function(done) {
    done("Not implemented")
  })

  xit('Jackal starts with the saved database', function(done) {
    done("Not implemented")
  })

  xit('Running the v1 contract passes because it now exists', function(done) {
    done("Not implemented")
  })
})
