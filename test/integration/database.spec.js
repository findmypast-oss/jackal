const provider = require('./support/provider')
const jackal = require('./support/jackal')
const client = require('./support/client')

describe('Database tests', function() {

  before((done) => {
    jackal.start({}, done)
  })
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
    jackal.start({}, done)
  })

  it('Running the v1 contract fails because it does not exist', function(done) {
    client.run({ provider: 'integration', isPass: false }, done)
  })

  xit('Jackal stops successfully', function(done) {
    jackal.stop(done)
  })

  xit('Jackal starts with the saved database', function(done) {
    jackal.start({
      dbPath: 'test/integration/db.json'
    }, done)
  })

  xit('Running the v1 contract passes because it now exists', function(done) {
    client.run({ provider: 'integration', isPass: true }, done)
  })
})
