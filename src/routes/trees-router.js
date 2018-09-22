'use strict';

const path = require('path');
const fs = require('fs');
const User = require('../model/user-template');
const app = require('../lib/router');
const logger = require('../lib/logger');

const userStorage = {
  table: [],
};

const writeUserFile = (data, callback) => {
  const dataFile = path.join(__dirname, '../data/user.session.json');
  fs.writeFile(`${dataFile}`, data, (error) => {
    if (error) {
      throw error;
    }
    return callback;
  });
};

const sendStatus = (statusCode, message, response) => {
  logger.log(logger.INFO, `Responding with a ${statusCode} status code due to ${message}`);
  response.writeHead(statusCode);
  response.end();
};

const sendJSON = (statusCode, data, response) => {
  logger.log(logger.INFO, `Responding with a ${statusCode} status and the following data`);
  logger.log(logger.INFO, JSON.stringify(data));

  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(data));
  response.end();
};

//! Vinicio - this route is going to be used to CREATE notes
app.post('/api/notes', (request, response) => {
  if (!request.body) {
    sendStatus(400, 'body not found', response);
    return undefined;
  }
  //! Vinicio - making sure I have all the information I need to create a new user
  if (!request.body.title) {
    sendStatus(400, 'title not found', response);
    return undefined;
  }

  if (!request.body.content) {
    sendStatus(400, 'content not found', response);
    return undefined;
  }
  //----------------------------------------------------------------------------------
  // User CREATION
  //----------------------------------------------------------------------------------
  const user = new User(request.body.username, request.body.title);
  userStorage.table.push(user);
  sendJSON(200, user, response);
  return undefined;
});

app.post('/new/user', (request, response) => {
  // ALGO:
  // validate all the input (i.e. request)
  // create a user
  //----------------------------------------------------------------------------------
  // REQUEST VALIDATION
  //----------------------------------------------------------------------------------
  if (!request.body) {
    sendStatus(400, 'body not found', response);
    return undefined;
  }
  // ensure all the information I need to create a new user
  if (!request.body.username) {
    sendStatus(400, 'title not found', response);
    return undefined;
  }

  if (!request.body.title) {
    sendStatus(400, 'content not found', response);
    return undefined;
  }
  //----------------------------------------------------------------------------------
  // User CREATION
  //----------------------------------------------------------------------------------
  const user = new User(request.body.username, request.body.title);
  logger.log(logger.INFO, `new user = ${Object.keys(user)}`);
  userStorage.table.push(user);
  sendJSON(200, user, response);
  // write data to json file
  const stringIfyUserStorage = JSON.stringify(userStorage);
  logger.log(logger.INFO, `userStorage = ${stringIfyUserStorage}`);
  writeUserFile(stringIfyUserStorage);
  return undefined;
});

app.post('/login', (request, response) => {
  logger.log(logger.INFO, `new user = ${request.body.id}`);
  for (let searchTable = 0; searchTable <= userStorage.table.length - 1; searchTable++) {
    if (userStorage.table[searchTable].id === request.body.id) {
      // we can trust this id because it is unique
      response.write(`Hello, ${userStorage.table[searchTable].username}.`);
      response.end();
    }
  }
  return undefined;
});


app.get('/', (request, response) => {
  response.write('<!DOCTYPE><header></header><body><div><p>cool beans.</p></div></body></html>');
  response.end();
  return undefined;
});
