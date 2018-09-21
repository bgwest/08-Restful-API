# RESTful API - server.js
##### a vanilla RESTful API with in-memory persistence
[![Build Status](https://travis-ci.com/bgwest/08-Restful-API.svg?branch=master)](https://travis-ci.com/bgwest/08-Restful-API)
## Overview

* HTTP server with native NodeJS http module
* have object constructor that creates a simple resource with at least 3 properties
* include an id property that is set to a uuid (include two additional properties of your choice (ex: name, content, etc.) ).
* has custom body parser module that uses promises to parse the JSON body of POST and PUT requests
* has custom url parser that returns a promise
* has a router constructor that handles requests to GET, POST, PUT, and DELETE requests
* has a storage module that stores resources by their schema type (ex: note) and id

#### How to run

Example:
```
npm run start-server
````

### Tests Performed with Jest

* test1: ensure api returns a status code of 404 for routes that have not been registered

* test2: ensure the /api/simple-resource-name endpoint responds as described for each condition below:

GET: (404) should respond with 'not found' for valid requests made with an id that was not found

GET: (400) should respond with 'bad request' if no id was provided in the request

GET: (200) should contain a response body for a request made with a valid id 

POST: (400) should respond with 'bad request' if no request body was provided or the body was invalid

POST: (200) should respond with the body content for a post request with a valid body


### Installing

To use this in your code:

- git clone repo 
- npm install 
- require('../src/lib/app.js')

## Built With

* es6
* NodeJS
* winston
* Eslint
* jest
* superagent

## Contributing

Please feel free to contribute. Master branch auto merge locked for approval for non-contributors.

## Versioning

*n/a*

## Authors

![CF](http://i.imgur.com/7v5ASc8.png) **Benjamin West** 

## License

*none*
