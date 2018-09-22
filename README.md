# RESTful API - app.js
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

in a different terminal:

```
[1]bwest:08-Restful-API bwest$ echo '{"username":"vsanchez","title":"Senior Software Engineer"}' | http localhost:3000/new/user
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: application/json
Date: Sat, 22 Sep 2018 06:21:33 GMT
Transfer-Encoding: chunked

{
    "id": "c0a17ff0-be2f-11e8-93df-ffd9839776dd",
    "timestamp": "2018-09-22T06:21:33.935Z",
    "title": "Senior Software Engineer",
    "username": "vsanchez"
}

[0]bwest:08-Restful-API bwest$ echo '{"id":"c0a17ff0-be2f-11e8-93df-ffd9839776dd"}' | http localhost:3000/login
HTTP/1.1 200 OK
Connection: keep-alive
Date: Sat, 22 Sep 2018 06:21:56 GMT
Transfer-Encoding: chunked

Hello, vsanchez.

[0]bwest:08-Restful-API bwest$ echo '{"username":"bgwest","title":"Sysadmin / Junior Dev"}' | http localhost:3000/new/user?keys=12421i421\&next=1412413
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: application/json
Date: Sat, 22 Sep 2018 06:22:28 GMT
Transfer-Encoding: chunked

{
    "id": "e1605f90-be2f-11e8-93df-ffd9839776dd",
    "timestamp": "2018-09-22T06:22:28.874Z",
    "title": "Sysadmin / Junior Dev",
    "username": "bgwest"
}

[0]bwest:08-Restful-API bwest$ echo '{"id":"e1605f90-be2f-11e8-93df-ffd9839776dd"}' | http :3000/login
HTTP/1.1 200 OK
Connection: keep-alive
Date: Sat, 22 Sep 2018 06:23:08 GMT
Transfer-Encoding: chunked

Hello, bgwest.

[0]bwest:08-Restful-API bwest$
```

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
- require('../src/app.js')

## Built With

* es6
* NodeJS
* winston
* Eslint
* jest
* superagent
* uuid

## Contributing

Please feel free to contribute. Master branch auto merge locked for approval for non-contributors.

## Versioning

*n/a*

## Authors

![CF](http://i.imgur.com/7v5ASc8.png) **Benjamin West** 

## License

*none*
