# Jackal API Guide

__Note:__ Jackal is currently under development, while the API is not likely to change ahead of the 1.0.0 release nor should it be considered fully stable. If the API is updated this guide will be updated to reflect any change.

---------------

The Jackal server provides five API routes which act as an interface to the service.

## Health Endpoint

The Health Endpoint can be use to check the deployed Jackal service is alive.

##### Request

```
METHOD:   GET
URL:      http://path.to.your.jackal.server:25863/api/health
```

##### Response

```
STATUS:   200
BODY:     😊
```

## Consumer Endpoint

##### Request

```
METHOD:   POST
HEADERS:  Content-Type: application/json
URL:      http://path.to.your.jackal.server:25863/api/contracts
BODY:     <consumer_contracts_object>
```

The `<consumer_contracts_object>` should be in the format specified in the [Jackal Contract Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/contract.md).

##### Response

The Consumer Endpoint supports multiple responses depending on whether the submitted Contracts were received, were valid, were executed with failures, were executed successfully & cached, or were failed to be cached.

###### No Contracts Received

```
STATUS:   400
HEADERS:  Content-Type: application/json
BODY:     {
  message: 'One or more contracts are invalid',
  status: 'INVALID',
  results: []
}
```

###### Multiple Consumers

```
STATUS:   400
HEADERS:  Content-Type: application/json
BODY:     {
  message: 'Contract object must contain a single consumer',
  status: 'INVALID',
  results: []
}
```

###### Contracts Invalid

```
STATUS:   400
HEADERS:  Content-Type: application/json
BODY:     {
  message: 'One or more contracts are invalid',
  status: 'INVALID',
  results: <validations_array>
}
```

Details of the shape of the objects contained in the `<validations_array>` can be found in the [Jackal Validation Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/result.md).

###### Contracts Executed with Failures

```
STATUS:   200
HEADERS:  Content-Type: application/json
BODY:     {
  message: 'Failures Exist',
  status: 'FAILED',
  results: <results_array>
}
```

Details of the shape of the objects contained in the `<results_array>` can be found in the [Jackal Result Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/result.md).

###### Contracts Executed Successfully And Cached

```
STATUS:   201
HEADERS:  Content-Type: application/json
BODY:     {
  message: 'All Passed',
  status: 'PASSED',
  results: <results_array>
}
```

Details of the shape of the objects contained in the `<results_array>` can be found in the [Jackal Result Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/result.md).

###### Contracts Failed to Be Cached

```
STATUS:   500
HEADERS:  Content-Type: application/json
BODY:     {
  message: 'Cache failed on contracts insertion',
  status: 'ERROR',
  results: []
}
```

## Provider Endpoint

The Provider Endpoint can be used to run all stored Consumer Contracts for a specified Provider.

##### Request

```
METHOD:   GET
URL:      http://path.to.your.jackal.server:25863/api/contracts/:provider
```

The `:provider` should match the name of the Provider used in any Consumer Contracts previously submitted to Jackal.

##### Response

```
STATUS:   200
HEADERS:  Content-Type: application/json
BODY:     <provider_response>
```

The `<provider_response>` is an object serialised as JSON and has one of three sets of values.

###### No Contracts

In the case where no contracts are found for the specified Provider, where `<provider>` is the name of the specified Provider:

```
{
  message:  'No contracts found for provider: <provider>',
  status:   'NO_CONTRACTS',
  results:  []
}
```

###### Contracts Passed

In the case of Contracts being found for the specified Provider and all contracts passing:

```
{
  message:  'All Passed',
  status:   'PASSED',
  results:  <results_array>
}
```

Details of the shape of the objects contained in the `<results_array>` can be found in the [Jackal Result Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/result.md).

###### Contracts Failed

In the case of Contracts being found for the specified Provider and at least one contract failing:

```
{
  message:  'Failures Exist',
  status:   'FAILED',
  results:  <results_array>
}
```

Details of the shape of the objects contained in the `<results_array>` can be found in the [Jackal Result Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/result.md).

## Statistics Endpoint

The Statistics Endpoint can be used to retrieve usage statistics for the running Jackal service.

##### Request

```
METHOD:   GET
URL:      http://path.to.your.jackal.server:25863/api/stats
```

In addition to the basic url above, the Statistics Endpoint can accept a query string consisting of a consumer, a provider or both:

```
?consumer=<consumer>
?provider=<provider>
?consumer=<consumer>&provider=<provider>
```

##### Response

```
STATUS:   200
HEADERS:  Content-Type: application/json
BODY:     <statistics>
```

The `<statistics>` are usage statistics for the running Jackal service returned as a serialised JSON object. Details of the shape of the object can be found in the [Jackal Statistics Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/statistics.md).

## Database Endpoint

The Database Endpoint can be used to retrieve the Jackal Database.

##### Request

```
METHOD:   GET
URL:      http://path.to.your.jackal.server:25863/api/db
```

##### Response

```
STATUS:   200
HEADERS:  Content-Type: application/json
BODY:     <database>
```

The `<database>` is the the current state of the LokiJS database used by Jackal serialised as JSON.
