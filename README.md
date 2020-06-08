# EPG Metadata

Project main goal is automation in creating EPG schemas using XMLTV format (human readable format). Also, creating database with augmented assets data.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Latest LTS version of [NodeJS](https://nodejs.org/en/)
Database [MongoDB](https://www.mongodb.com/) (there should be 2 database per instance. one for production and another one for testing!!! At least development environment)

(installing NodeJS and MongoDB vary depending on the OS...)


### Installing

To create a running version of application, one should run 'build' script from package.json.
What build script will do is next:

1. Create 'dist/' folder with compiled code to ES5.
2. Install npm dependency packages
3. Start/restart node process


```
npm run build
```

If success, you should be seeing something like this:
```
> metadata-epg-api@0.0.1 build '$/path/to/dir'
> babel src -s -D -d dist --presets es2015,stage-0

src/config/createDB.js -> dist/config/createDB.js
src/controllers/auth.js -> dist/controllers/auth.js
src/controllers/country.js -> dist/controllers/country.js
src/controllers/createDB.js -> dist/controllers/createDB.js
src/controllers/language.js -> dist/controllers/language.js
src/controllers/user.js -> dist/controllers/user.js
src/db.js -> dist/db.js
src/handlers/createDB.js -> dist/handlers/createDB.js
src/createDB.js -> dist/createDB.js
src/middlewares/authMiddleware.js -> dist/middlewares/authMiddleware.js
src/middlewares/errorHandler.js -> dist/middlewares/errorHandler.js
src/middlewares/createDB.js -> dist/middlewares/createDB.js
src/models/country.js -> dist/models/country.js
src/models/language.js -> dist/models/language.js
src/models/user.js -> dist/models/user.js
src/routes/createDB.js -> dist/routes/createDB.js
src/swagger/countries.js -> dist/swagger/countries.js
src/swagger/createDB.js -> dist/swagger/createDB.js
src/swagger/languages.js -> dist/swagger/languages.js
src/swagger/utils/generator.js -> dist/swagger/utils/generator.js
src/swagger/utils/messages.js -> dist/swagger/utils/messages.js
src/utils/auth/createDB.js -> dist/utils/auth/createDB.js
src/utils/createDB.js -> dist/utils/createDB.js
src/utils/response/error.js -> dist/utils/response/error.js
src/utils/response/createDB.js -> dist/utils/response/createDB.js
src/utils/response/success.js -> dist/utils/response/success.js

```
## Deployment
Deploy/Copy dist folder to your environment.
Within config folder,there must be a 'mongodb.pem' key file for accessing database, provided by client.
No additional notes about how to deploy this on a live system.
Just start npm run script:
```
npm start
```

## Running the tests

Test are run with 'test' command.

This is a API endpoint test. It test standard CRUD methods.

```
npm run test
```


## Built With

* [NodeJS](https://nodejs.org/en/) - Server technology
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Express](https://expressjs.com/) - Used to generate routes
* [MongoDB](https://www.mongodb.com/) - Storage engine

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Igor Gojkovic <igor.gojkovic@team4js.com>** - *Hive Software Solutions*
* **Milos Markovic <milos.markovic@team4js.com>** - *Marsovski*
* **Andrija Gojkovic <andrija.gojkovic@team4js.com>** - *Remote Coding*

## License

This project is licensed under the Copyright License

