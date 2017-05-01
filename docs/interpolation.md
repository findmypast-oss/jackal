# Jackal Interpolation Guide

Jackal can interpolate data into requests to facilitate idempotent contract testing.

Unique identifiers can be interpolated into the body of any `before` and `after` hook requests and the main contract request.

Variables can be interpolated into the url and headers of any `before` and `after` hook requests and the main contract request. Variables are extracted from the response received in reply to a hook request - they can _not_ be extracted from the response received in reply to the main contract request.

## Unique Identifiers

Certain API requests may require some unique information to be sent as part of a new request, for instance a unique email when submitting a registration request. Jackal handles this by interpolating a unique identifier into the body of any request bodies where the `<%= unique_id %>` tag is present, for example:

```json
{
  "name": "John Doe",
  "email": "<%= unique_id %>@test.com"
}
```

The [hyperid](https://www.npmjs.com/package/hyperid) library is used to provide a balance between uniqueness and performance.

## Variables

### Variable Extraction

Variables can be extracted from the response received in reply to a hook request, the `variables` field of the hook object is used to map keys to [jsonpath](https://github.com/dchester/jsonpath) queries which extract the data from the response, for example:

```json
// before hook
{
  "request": {
    "baseUrl": "http://some.api.server",
    "path": "api/user",
    "method": "POST",
    "body": {
      "name": "John Doe",
      "email": "john@doe.com"
    }
  },
  "response": {
    "statusCode": 200
  },
  "variables": {
    "userId": "$.body.userId"
  }
}

// response (fields omitted for conciseness)
{
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "userId": 1234,
    "name": "John Doe",
    "email": "john@doe.com"
  },
  "statusCode": 200
}

// mapped variables
{
  "userId": 1234
}
```

### Variable Usage

Following on from the above example, the mapped variables object would be passed on to each subsequent hook and the main contract request to allow interpolation of data, for example:

```json
// this submitted contract raw request object...
{
  "body": {
    "baseUrl": "http://some.api.server",
    "path": "api/user/<%= userId %>"
  }
}

// ...would become the following contract interpolated request object
{
  "baseUrl": "http://some.api.server",
  "path": "api/user/1234"
}
```

### Guidelines

- Request bodies can _not_ be modified other than through the interpolation of unique identifiers
- Variables can be extracted from responses to Hook Requests, they can _not_ be extracted from responses to the main Contract Request
- Variables can be used to modify the URL or headers of subsequent Hook Requests _and_ the main Contract Request
