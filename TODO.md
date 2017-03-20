Task List
---------

Codebase
--------
- [x] Write contract execution logic
  - [x] Include `consumer-contracts` and use `validateContracts` function and remove duplicated logic
  - [x] Duplicate logic from `lib/validator.js` file of `consumer-contracts` if necessary
- [ ] Make filename for cache/db an arg when running the service
- [x] Add endpoint to dump db in order to retrieve file to recopy it in when deploying

Docker
------
- [ ] Make Dockerfile to allow quick deployment of Jackal as a service
- [ ] Ensure ability to specify cache file when running (ie. copy it into the container)
- [ ] Release Dockerfile to Docker Hub

Admin
-----
- [x] Ask current Jackal npm package owner if we can have the name
- [ ] Go through ownership transfer process for package name with NPM
- [ ] Add badges to README for NPM version, NPM downloads and GitHub release
