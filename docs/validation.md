# Jackal Validation Guide

__NOTE:__ Jackal is currently in alpha and so the API is not yet considered fully stable. Currently we anticipate at least one major API change prior to reaching a 1.0.0 release, and this document will be updated to reflect any API changes we make.

Jackal returns a validation object in JSON, where each validation within the `validations` array is an object with the following format:

```
{
  contract:     STRING
  valid:        BOOLEAN
  errors: [
    {
      name:     STRING
      message:  STRING
    }
  ]
}
```

The following applies:

- The `contract` field is in the format `<provider>/<api> <- <consumer>` to identify the contract which was invalid
- The `valid` field is a boolean and indicate whether the contract is valid
- The `errors` array is null if the contract is valid, and an array of objects with the shape shown if it isn't
