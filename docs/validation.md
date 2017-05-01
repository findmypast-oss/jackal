# Jackal Validation Guide

The Jackal Consumer Endpoint can return an array of validations serialised as JSON when the shape or content of submitted contracts is invalid. Each validation object within the validation array has the following format:

```json
{
  "contract": "STRING",
  "valid":    "BOOLEAN",
  "errors":   "NULL | ARRAY"
}
```

The following applies:

- The `contract` field is in the format `<provider>/<api>/<scenario> <- <consumer>` to identify the contract which was invalid
- The `valid` field is a boolean and indicate whether the contract is valid
- The `errors` field is `null` if the contract is valid, if it is invalid, the `errors` field is an array of objects with the following shape:

```json
{
  "name":     "STRING",
  "message":  "STRING"
}
```
