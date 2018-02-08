# Jackal Contract Before & After Hooks Guide

Consumer Contracts Objects sent to Jackal may optionally contain `before` and `after` hooks, hooks can be used to perform any necessary set up and tear down for contract testing.

The `before` and `after` hooks are specified as an array of objects, using either JSON or YAML in line with the chosen format of the larger contracts file.

## JSON

If specifying the Contracts Object in JSON, the following format should be used:

```json
{
  "name":         "STRING  // REQUIRED",
  "request": {
    "baseUrl":    "STRING  // REQUIRED",
    "path":       "STRING  // OPTIONAL, DEFAULT: undefined",
    "query":      "STRING  // OPTIONAL, DEFAULT: undefined",
    "method":     "STRING  // OPTIONAL, DEFAULT: GET",
    "headers":    "OBJECT  // OPTIONAL, DEFAULT: undefined",
    "body":       "OBJECT  // OPTIONAL, DEFAULT: undefined",
    "timeout":    "INTEGER // OPTIONAL, DEFAULT: OS Dependent"
  },
  "response": {
    "statusCode": "INTEGER // REQUIRED"
  },
  "variables":    "OBJECT  // OPTIONAL, DEFAULT: undefined"
}
```

## YAML

If specifying the Contracts Object in YAML, the following format should be used:

```yaml
name:             STRING  // REQUIRED
request:
  baseUrl:        STRING  // REQUIRED
  path:           STRING  // OPTIONAL, DEFAULT: undefined
  query:          STRING  // OPTIONAL, DEFAULT: undefined
  method:         STRING  // OPTIONAL, DEFAULT: GET
  headers:        OBJECT  // OPTIONAL, DEFAULT: undefined
  body:           OBJECT  // OPTIONAL, DEFAULT: undefined
  timeout:        INTEGER // OPTIONAL, DEFAULT: OS Dependent
response:
  statusCode:     INTEGER // REQUIRED
variables:        OBJECT  // OPTIONAL, DEFAULT: undefined
```


## Guidelines

- The `name` of the hook is used to produce an error message in the event of the hook failing
- The `response/statusCode` is used to verify the response received, if a different `statusCode` is received in response to the hook then the contract will fail without executing

### Request Interpolation

- Unique Identifiers may be dynamically inserted into the `request/body`
- Variables may be used to dynamically insert data into the following fields:
  - `request/baseUrl`
  - `request/path`
  - `request/query`
  - `request/headers`
  - `request/body`
- See the [Jackal Interpolation Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/interpolation.md) for more information on how to use Variables and Unique Identifiers

### Request Object

- `request/baseUrl` must be a valid url _including_ any non-standard port
- `request/path` and `request/query` fields are not validated so please ensure they are specified correctly
  - leading and trailing `/` & `?` characters are _not_ required
- `request/method` must be one of: `CONNECT`, `DELETE`, `GET`, `HEAD`, `OPTIONS`, `PATCH`, `POST`, `PUT`, `TRACE`
- `request/timeout` is specified in milliseconds

### Response Object

- `response/statusCode` must be one of: 100, 101, 102, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511

### Variables Object

- The `variables` object allow for data from earlier hooks to be stored and passed through to subsequent hooks _and_ the contract under test
- Each field on the `variables` object should be a valid [jsonpath](https://github.com/dchester/jsonpath) query where the root object is the response
- Overwriting the key `hookArrayType` in the variables object will likely lead to incorrect or garbled error messages in the event of the hook failing
- See the [Jackal Interpolation Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/interpolation.md) for more information on how to use Variables and Unique Identifiers
