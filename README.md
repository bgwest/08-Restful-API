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

## How To

#####Example uses:
```
npm run start-server
````

[x] adding a new user:

```
[1]Benjamins-MBP:08-Restful-API bwest$ echo '{"username":"bgwest88","title":"Sysadmin / Junior Developer"}' | http localhost:4000/new/user
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: application/json
Date: Tue, 25 Sep 2018 02:20:37 GMT
Transfer-Encoding: chunked

{
    "id": "976be5d0-c069-11e8-96c4-c19524662312",
    "timestamp": "2018-09-25T02:20:37.933Z",
    "title": "Sysadmin / Junior Developer",
    "username": "bgwest88"
}

[0]Benjamins-MBP:08-Restful-API bwest$ 
[0]Benjamins-MBP:08-Restful-API bwest$ echo '{"username":"tanyan","title":"Front-end Web Developer"}' | http localhost:4000/new/user
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: application/json
Date: Tue, 25 Sep 2018 02:20:43 GMT
Transfer-Encoding: chunked

{
    "id": "9a9c1720-c069-11e8-96c4-c19524662312",
    "timestamp": "2018-09-25T02:20:43.282Z",
    "title": "Front-end Web Developer",
    "username": "tanyan"
}

[0]Benjamins-MBP:08-Restful-API bwest$ 
[0]Benjamins-MBP:08-Restful-API bwest$ echo '{"username":"dramos","title":"Software Engineer"}' | http localhost:4000/new/user
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: application/json
Date: Tue, 25 Sep 2018 02:21:27 GMT
Transfer-Encoding: chunked

{
    "id": "b4decec0-c069-11e8-96c4-c19524662312",
    "timestamp": "2018-09-25T02:21:27.340Z",
    "title": "Software Engineer",
    "username": "dramos"
}

[0]Benjamins-MBP:08-Restful-API bwest$ 

```

[x] Get full user list:

```

[0]Benjamins-MBP:08-Restful-API bwest$ http :4000/get/users?getUsers=true
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: application/json
Date: Tue, 25 Sep 2018 02:22:28 GMT
Transfer-Encoding: chunked

{
    "bgwest88": "bgwest88",
    "dramos": "dramos",
    "tanyan": "tanyan"
}

```

[x] "Login" as single user

```

[0]Benjamins-MBP:08-Restful-API bwest$ http :4000/login?id=b4decec0-c069-11e8-96c4-c19524662312
HTTP/1.1 200 OK
Connection: keep-alive
Date: Tue, 25 Sep 2018 02:22:51 GMT
Transfer-Encoding: chunked

Hello, dramos.

[0]Benjamins-MBP:08-Restful-API bwest$ 

```

[x] DELETE users

```

[0]Benjamins-MBP:08-Restful-API bwest$ 
[0]Benjamins-MBP:08-Restful-API bwest$ http DELETE :4000/?id=b4decec0-c069-11e8-96c4-c19524662312
HTTP/1.1 200 OK
Connection: keep-alive
Date: Tue, 25 Sep 2018 02:25:18 GMT
Transfer-Encoding: chunked

ID: b4decec0-c069-11e8-96c4-c19524662312 removed.

[0]Benjamins-MBP:08-Restful-API bwest$ 
[0]Benjamins-MBP:08-Restful-API bwest$ 
[0]Benjamins-MBP:08-Restful-API bwest$ http DELETE :4000/?id=9a9c1720-c069-11e8-96c4-c19524662312
HTTP/1.1 200 OK
Connection: keep-alive
Date: Tue, 25 Sep 2018 02:25:52 GMT
Transfer-Encoding: chunked

ID: 9a9c1720-c069-11e8-96c4-c19524662312 removed.

[0]Benjamins-MBP:08-Restful-API bwest$ 

```

[x] re-check users have been deleted:

```

[0]Benjamins-MBP:08-Restful-API bwest$ 
[0]Benjamins-MBP:08-Restful-API bwest$ http :4000/get/users?getUsers=true
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: application/json
Date: Tue, 25 Sep 2018 02:26:01 GMT
Transfer-Encoding: chunked

{
    "bgwest88": "bgwest88"
}

[0]Benjamins-MBP:08-Restful-API bwest$

```

### Tests Performed with Jest

* test 1: should respond with 200 status code and json of newly created user

* test 2: should respond with 200 status code and json of newly created username

* test 3: should respond with 400 status code if there is no title

* test 4: should respond with 'bad request' if no request body was provided given at all.

* test 5: for 'valid requests' made with an id that was not found, should respond with 404 'not found'

* test 6: if no id was provided, should return bad request with 400 status

* test 7: if valid ID is given ensure correct username is returned with 200 status


### Installing

To use this in your code:

- git clone repo 
- npm install 
- require('../src/app.js')

## Built With

* es6
* NodeJS (fs, dotenv, http)
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
