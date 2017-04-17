# Jackal Validation Guide

__Note:__ Jackal is currently under development, while the API is not likely to change ahead of the 1.0.0 release nor should it be considered fully stable. If the API is updated this guide will be updated to reflect any change.

---------------

The Jackal Consumer Endpoint can return an array of validations serialised as JSON when the shape or content of submitted contracts is invalid. Each validation object within the validation array has the following format:

```
{
  contract: STRING
  valid:    BOOLEAN
  errors:   NULL | ARRAY
}
```

The following applies:

- The `contract` field is in the format `<provider>/<api>/<scenario> <- <consumer>` to identify the contract which was invalid
- The `valid` field is a boolean and indicate whether the contract is valid
- The `errors` field is `null` if the contract is valid, if it is invalid, the `errors` field is an array of objects with the following shape:

```
{
  name:     STRING
  message:  STRING
}
```
