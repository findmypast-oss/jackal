'use strict'

const createGetStats = (db) => {
  return (req, res, next) => {
    const consumer = req.query.consumer
    const provider = req.query.provider

    let statsPack

    const filterByConsumer = (dbo) => dbo.consumer === consumer

    if (consumer && provider) {
      const apis = db.getAPIsByConsumerAndProvider(consumer, provider)
      const providerContracts = db.retrieveCollection(provider)
      const consumerContracts = providerContracts.filter(filterByConsumer)

      statsPack = {
        consumer: consumer,
        provider: provider,
        apiCount: apis.length,
        apis: apis,
        contractCount: consumerContracts.length
      }
    } else if (consumer) {
      const providers = db.getProvidersByConsumer(consumer)
      const apis = db.getAPIsByConsumer(consumer)

      const contractCount = providers.reduce((count, provider) => {
        const providerContracts = db.retrieveCollection(provider)
        const consumerContracts = providerContracts.filter(filterByConsumer)
        return count + consumerContracts.length
      })

      statsPack = {
        consumer: consumer,
        providerCount: providers.length,
        providers: providers,
        apiCount: apis.length,
        contractCount: contractCount
      }
    } else if (provider) {
      const consumers = db.getConsumersByProvider(provider)
      const apis = db.getAPIsByProvider(provider)
      const contractCount = db.retrieveCollection(provider).length

      statsPack = {
        provider: provider,
        consumerCount: consumers.length,
        consumers: consumers,
        apiCount: apis.length,
        apis: apis,
        contractCount: contractCount
      }
    } else {
      const consumers = db.getConsumers()
      const providers = db.getProviders()

      const apiCount = providers.reduce((count, provider) => {
        return count + db.getAPIsByProvider(provider).length
      }, 0)

      const contractCount = providers.reduce((count, provider) => {
        return count + db.retrieveCollection(provider).length
      }, 0)

      statsPack = {
        consumerCount: consumers.length,
        consumers: consumers,
        providerCount: providers.length,
        providers: providers,
        apiCount: apiCount,
        contractCount: contractCount
      }
    }

    res.status(200).send(statsPack)
  }
}

module.exports = createGetStats



// consumer/provider/api/scenario
//
// consumers
