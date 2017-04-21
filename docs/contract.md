# Jackal Contract Guide

Consumers should define a Consumer Contracts Object in JSON or YAML. The YAML format may only be used if interacting with a Jackal service via the Jackal Client, the Jackal Client will convert the JSON to YAML prior to sending the Contract(s) to the running Jackal server.

The Jackal Client also allows a set of Consumer Contracts to be defined over multiple files, see the [Jackal Client Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/client.md) for more information.

The JSON and YAML overviews below use the generic terms `consumer`, `provider`, `api` and `scenario` to illustrate the nested structure of the Contracts object. In reality these properties should be named appropriately to reflect the specifics of a given contract, no restrictions are placed on how they are named so long as the name is a valid JSON key.

## JSON

If specifying the Contracts Object in JSON, the following format should be used:

```
{
  consumer: {
    provider: {
      api: {
        scenario: {
          before: [
            {
              url:        STRING                    // REQUIRED
              method:     STRING                    // OPTIONAL, DEFAULT: GET
              body:       OBJECT / ARRAY / STRING   // OPTIONAL, DEFAULT: undefined
              timeout:    INTEGER                   // OPTIONAL, DEFAULT: OS Dependent
            },
          ],
          after: [
            {
              url:        STRING                    // REQUIRED
              method:     STRING                    // OPTIONAL, DEFAULT: GET
              body:       OBJECT / ARRAY / STRING   // OPTIONAL, DEFAULT: undefined
              timeout:    INTEGER                   // OPTIONAL, DEFAULT: OS Dependent
            },
          ],
          request: {
            baseUrl:    STRING                    // REQUIRED
            path:       STRING                    // OPTIONAL, DEFAULT: undefined
            query:      STRING                    // OPTIONAL, DEFAULT: undefined
            method:     STRING                    // OPTIONAL, DEFAULT: GET
            headers:    OBJECT                    // OPTIONAL, DEFAULT: undefined
            body:       OBJECT / ARRAY / STRING   // OPTIONAL, DEFAULT: undefined
            timeout:    INTEGER                   // OPTIONAL, DEFAULT: OS Dependent
          },
          response: {
            statusCode: INTEGER                   // REQUIRED
            headers:    OBJECT                    // OPTIONAL, DEFAULT: undefined
            body:       OBJECT / ARRAY / STRING   // OPTIONAL, DEFAULT: undefined
          }
        }
      }
    }
  }
}
```

## YAML

If specifying the Contracts Object in JSON, the following format should be used:

```
consumer:
  provider:
    api:
      scenario:
        before:
          - url:        STRING                    // REQUIRED
            method:     STRING                    // OPTIONAL, DEFAULT: GET
            body:       OBJECT / ARRAY / STRING   // OPTIONAL, DEFAULT: undefined
            timeout:    INTEGER                   // OPTIONAL, DEFAULT: OS Dependent
        after:
          - url:        STRING                    // REQUIRED
            method:     STRING                    // OPTIONAL, DEFAULT: GET
            body:       OBJECT / ARRAY / STRING   // OPTIONAL, DEFAULT: undefined
            timeout:    INTEGER                   // OPTIONAL, DEFAULT: OS Dependent
        request:
          baseUrl:      STRING                    // REQUIRED
          path:         STRING                    // OPTIONAL, DEFAULT: undefined
          query:        STRING                    // OPTIONAL, DEFAULT: undefined
          method:       STRING                    // OPTIONAL, DEFAULT: GET
          headers:      OBJECT / ARRAY / STRING   // OPTIONAL, DEFAULT: undefined
          body:         OBJECT / ARRAY / STRING   // OPTIONAL, DEFAULT: undefined
          timeout:      INTEGER                   // OPTIONAL, DEFAULT: OS Dependent
        response:
          statusCode:   INTEGER                   // REQUIRED
          headers:      OBJECT / ARRAY / STRING   // OPTIONAL, DEFAULT: undefined
          body:         OBJECT / ARRAY / STRING   // OPTIONAL, DEFAULT: undefined
```

## Guidelines

- A _single_ Consumer object __must__ be specified at the top level of the Contracts object
- The Consumer object may have multiple provider fields, each of which should be an object
- Each Provider object may have multiple API fields, each of which should be an object
- Each API object may have multiple Scenario fields, each of which should be an object
- Each Scenario object __must__ define a request field and a response field, each of which should be an object
- Each Scenario object may define a before field and an after field, each of which should be an array of objects

#### Before & After Arrays

- The `before` and `after` fields in each Scenario are optional
- Data from a `before` action cannot be stored and used in the contract being executed, nor in the `after` action
- If defined, the objects in the `before` and `after` arrays should contain only the fields illustrated in the examples above. The values of these fields should match the data types listed.
- The `timeout` field is specified in milliseconds.

#### Request Object

- `request/baseUrl` must be a valid url
- `request/path` must begin with a `/`
- `request/query` must begin with a `?`
- `request/method` must be one of: `CONNECT`, `DELETE`, `GET`, `HEAD`, `OPTIONS`, `PATCH`, `POST`, `PUT`, `TRACE`
- `request/timeout` is specified in milliseconds

#### Response Object

- `response/statusCode` must be one of: 100, 101, 102, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511
- `response/body` must be an object, string or array:
  - if a string, it should be the string representation of a valid [Joi](https://github.com/hapijs/joi) schema
  - if an object, the value of each field should be the string representation of a valid Joi schema
  - if an array, the values should be either a string or an object, as described previously
