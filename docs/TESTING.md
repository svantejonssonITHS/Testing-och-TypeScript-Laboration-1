[← Go back](../README.md)

# Testing

The project has many different tests, most functions and components have been tested using a few different strategies.

To try the tests you have had to finish the setup guide first!

## Backend

The backend (api) uses `jest` as its testing framework and includes both `unit` tests as well as `e2e` tests.

To try all backend tests:
```sh
npm run test -w api
```

To only run unit tests:
```sh
npm run test:unit -w api
```

To only run e2e tests:
```
npm run test:e2e -w api
```

## Frontend

The frontend (client) also use `jest` as its main testing framework but also uses `react testing library` for the component and util tests.

To run all frontend tests:
```sh
npm run test -w client
```

## Application

All application wide tests use `cypress` as the testing framework and `cucumber` as the preprocessor.

To run all tests application wide (not including `bdd` and cypress `e2e`):
```sh
npm run test
```

To run all unit tests application wide:
```sh
npm run test:unit
```

To run `bdd` and cypress `e2e` tests:
```sh
npm run cypress:run
```

**NOTE:** All tests related to cypress require the project to be running simultaneously since it tests the connection between the client and api (and all related services). If you have followed the setup guide and have the project running in another terminal all should work 🤞
