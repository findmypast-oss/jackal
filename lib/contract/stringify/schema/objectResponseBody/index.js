'use strict'

const objectResponseBodySchema = {
  title: 'Contracts Schema',
  type: 'object',
  properties: {
    name: { type: 'string' },
    consumer: { type: 'string' },
    request: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        method: { type: 'string', enum: [ 'CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE' ] },
        headers: {
          type: 'object',
          properties: {},
          patternProperties: { '^.*$': { type: 'string' } }
        },
        body: { type: 'string' }
      }
    },
    response: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'integer',
          enum: [
            100, 101, 102, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302,
            303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409,
            410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 426, 428, 429,
            431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511
          ]
        },
        headers: {
          type: 'object',
          properties: {},
          patternProperties: { '^.*$': { type: 'string' } }
        },
        body: {
          type: 'object',
          properties: {},
          patternProperties: {
            '^.*$': {
              anyOf: [
                { type: 'string' },
                { type: 'integer' },
                { type: 'number' },
                { type: 'array' },
                { type: 'object' },
                { type: 'boolean' },
                { type: 'null' }
              ]
            }
          }
        }
      }
    }
  }
}

module.exports = objectResponseBodySchema
