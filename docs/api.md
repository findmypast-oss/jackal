# Jackal API Guide

__NOTE:__ Jackal is currently in alpha and under active development, as such the API should not yet be considered stable. Currently we anticipate at least one major API change prior to reaching a 1.0.0 release, and this document will be updated to reflect any API changes we make.

## Consumer Endpoint

#### Request

```
METHOD:   POST
URL:      http://path.to.your.jackal.server:25863/api/contracts
HEADERS:  Content-Type: application/json
BODY:     <contract_array>
```

The contract array should follow the guidelines laid out in the [Jackal Contract Guide](./contract.md)

#### Responses



## Provider Endpoint

#### Request

```
METHOD:   GET
URL:      http://path.to.your.jackal.server:25863/api/contracts/<provider>
```


#### Responses

## Dump Endpoint

#### Request

```
METHOD:   GET
URL:      http://path.to.your.jackal.server:25863/api/contracts
```

#### Responses


## Health Endpoint

#### Request

```
METHOD:   GET
URL:      http://path.to.your.jackal.server:25863/health
```

#### Responses
