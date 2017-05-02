# Jackal Contract Guide

Consumers should define a Consumer Contracts Object in JSON or YAML. The YAML format may only be used if interacting with a Jackal service via the Jackal Client, the Jackal Client will convert the JSON to YAML prior to sending the Contract(s) to the running Jackal server.

The Jackal Client also allows a set of Consumer Contracts to be defined over multiple files, see the [Jackal Client Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/client.md) for more information.

The JSON and YAML overviews below use the generic terms `consumer`, `provider`, `api` and `scenario` to illustrate the nested structure of the Contracts object. In reality these properties should be named appropriately to reflect the specifics of a given contract, no restrictions are placed on how they are named so long as the name is a valid JSON key.

## JSON

If specifying the Contracts Object in JSON, the following format should be used:

```json
{
  "consumer": {
    "provider": {
      "api": {
        "scenario": {
          "before":       "ARRAY                     // OPTIONAL, DEFAULT: undefined",
          "after":        "ARRAY                     // OPTIONAL, DEFAULT: undefined",
          "request": {
            "baseUrl":    "STRING                    // REQUIRED",
            "path":       "STRING                    // OPTIONAL, DEFAULT: undefined",
            "query":      "STRING                    // OPTIONAL, DEFAULT: undefined",
            "method":     "STRING                    // OPTIONAL, DEFAULT: GET",
            "headers":    "OBJECT                    // OPTIONAL, DEFAULT: undefined",
            "body":       "OBJECT / ARRAY / STRING   // OPTIONAL, DEFAULT: undefined",
            "timeout":    "INTEGER                   // OPTIONAL, DEFAULT: OS Dependent"
          },
          "response": {
            "statusCode": "INTEGER                   // REQUIRED",
            "headers":    "OBJECT                    // OPTIONAL, DEFAULT: undefined",
            "body":       "OBJECT / ARRAY / STRING   // OPTIONAL, DEFAULT: undefined"
          }
        }
      }
    }
  }
}
```

## YAML

If specifying the Contracts Object in JSON, the following format should be used:

```yaml
consumer:
  provider:
    api:
      scenario:
        before:           ARRAY                     // OPTIONAL, DEFAULT: undefined
        after:            ARRAY                     // OPTIONAL, DEFAULT: undefined
        request:
          baseUrl:        STRING                    // REQUIRED
          path:           STRING                    // OPTIONAL, DEFAULT: undefined
          query:          STRING                    // OPTIONAL, DEFAULT: undefined
          method:         STRING                    // OPTIONAL, DEFAULT: GET
          headers:        OBJECT / ARRAY / STRING   // OPTIONAL, DEFAULT: undefined
          body:           OBJECT / ARRAY / STRING   // OPTIONAL, DEFAULT: undefined
          timeout:        INTEGER                   // OPTIONAL, DEFAULT: OS Dependent
        response:
          statusCode:     INTEGER                   // REQUIRED
          headers:        OBJECT / ARRAY / STRING   // OPTIONAL, DEFAULT: undefined
          body:           OBJECT / ARRAY / STRING   // OPTIONAL, DEFAULT: undefined
```

## Guidelines

- A _single_ Consumer object __must__ be specified at the top level of the Contracts object
- The Consumer object may have multiple provider fields, each of which should be an object
- Each Provider object may have multiple API fields, each of which should be an object
- Each API object may have multiple Scenario fields, each of which should be an object
- Each Scenario object __must__ define a request field and a response field, each of which should be an object
- Each Scenario object may define a before field and an after field, each of which should be an array of objects

### Request Interpolation

- Unique Identifiers may be dynamically inserted into the `request/body`
- Variables may be used to dynamically insert data into the following fields:
  - `request/baseUrl`
  - `request/path`
  - `request/query`
  - `request/headers`
  - `request/body`
- See the [Jackal Interpolation Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/interpolation.md) for more information on how to use Variables and Unique Identifiers

#### Before & After Arrays

- Please see the [Jackal Hook Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/hook.md) for more information.

#### Request Object

- `request/baseUrl` must be a valid url _including_ any non-standard port
- `request/path` and `request/query` fields are not validated so please ensure they are specified correctly
  - leading and trailing `/` & `?` characters are _not_ required
- `request/method` must be one of: `CONNECT`, `DELETE`, `GET`, `HEAD`, `OPTIONS`, `PATCH`, `POST`, `PUT`, `TRACE`
- `request/timeout` is specified in milliseconds
- `request/body` can be specified as an object or array
  - in either of these cases it will be stringified using `JSON.stringify` prior to sending

#### Response Object

- `response/statusCode` must be one of: 100, 101, 102, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511
- `response/body` must be an object, string or array:
  - if a string, it should be the string representation of a valid [Joi](https://github.com/hapijs/joi) schema
  - if an object, the value of each field should be the string representation of a valid Joi schema
  - if an array, the values should be either a string or an object, as described previously
