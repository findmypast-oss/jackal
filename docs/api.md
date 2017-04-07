# Jackal API Guide

__NOTE:__ Jackal is currently in alpha and under active development, as such the API should not yet be considered stable. Currently we anticipate at least one major API change prior to reaching a 1.0.0 release, and this document will be updated to reflect any API changes we make.

## Consumer Endpoint

#### Request

```
METHOD:   POST
URL:      http://path.to.your.jackal.server:25863/api/contracts
HEADERS:  Content-Type: application/json
BODY:     <contracts_object>
```

The contracts object should follow the guidelines laid out in the [Jackal Contract Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/contract.md)

#### Responses

##### Contracts Executed

```
STATUS:   201
HEADERS:  Content-Type: application/json
BODY:     <result_array>
```

The result array will follow the guidelines laid out in the [Jackal Result Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/result.md)

##### No Contracts Received

```
STATUS:   400
HEADERS:  Content-Type: application/json
BODY:     { message: 'No contracts received' }
```

##### Invalid Contracts

```
STATUS:   400
HEADERS:  Content-Type: application/json
BODY:     { message: 'One or more contracts are invalid', validations: <validation_array> }
  or
BODY:     { name: 'JoiError', message: 'Joi string not well formed' }
  or
BODY:     { name: 'JoiError', message: 'Joi type not supported' }
```

The validation array will follow the guidelines laid out in the [Jackal Validation Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/validation.md)

##### Cache Error

```
STATUS:   500
HEADERS:  Content-Type: application/json
BODY:     { message: 'Cache failed on contracts insertion' }
  or
BODY:     { message: 'Cache failed on contracts retrieval' }
```

## Provider Endpoint

#### Request

```
METHOD:   GET
URL:      http://path.to.your.jackal.server:25863/api/contracts/<provider>
```

#### Responses

##### Contracts Executed

```
STATUS:   200
HEADERS:  Content-Type: application/json
BODY:     <result_array>
  or
BODY:     { message: 'No contracts exist for provider: <provider>' }
```

The result array will follow the guidelines laid out in the [Jackal Result Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/result.md)

## Dump Endpoint

#### Request

```
METHOD:   GET
URL:      http://path.to.your.jackal.server:25863/api/contracts
```

#### Responses

```
STATUS:   200
HEADERS:  Content-Type: application/json
BODY:     <database>
```

The `<database>` is the raw JSON saved by LokiJS to disk every sixty seconds and represents the state of the contracts cache at the time the endpoint is hit.

## Health Endpoint

#### Request

```
METHOD:   GET
URL:      http://path.to.your.jackal.server:25863/health
```

#### Response

```
STATUS:   200
BODY:     😊
```
