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

function validateAndReturnId(idToQuery, response, toDelete) {
  if (toDelete === true) {
    for (let searchTable = 0; searchTable <= userStorage.table.length - 1; searchTable++) {
      if (userStorage.table[searchTable].id === idToQuery) {
        delete userStorage.table[searchTable];
        // re-write data to json file
        const stringIfyUserStorage = JSON.stringify(userStorage);
        logger.log(logger.INFO, `userStorage = ${stringIfyUserStorage}`);
        writeUserFile(stringIfyUserStorage);
        response.write(`ID: ${idToQuery} removed.`);
        response.end();
        return undefined;
      }
    }
  } // else if DELETE is false
  logger.log(logger.INFO, `new user = ${idToQuery}`);
  for (let searchTable = 0; searchTable <= userStorage.table.length - 1; searchTable++) {
    if (userStorage.table[searchTable].id === idToQuery) {
      // we can trust this id because it is unique
      response.write(`Hello, ${userStorage.table[searchTable].username}.`);
      response.end();
      return undefined;
    }
  } // else
  response.writeHead(404, { 'Content-Type': 'text/plain' });
  response.write('Not found (Bad query): ensure the id you are sending is valid.');
  response.end();
  return undefined;
}

const sendStatus = (statusCode, message, response) => {
  logger.log(logger.INFO, `Responding with a ${statusCode} status code due to ${message}`);
  response.writeHead(statusCode);
  response.write(`Responding with a ${statusCode} status code due to ${message}`);
  response.end();
};

const sendJSON = (statusCode, data, response) => {
  logger.log(logger.INFO, `Responding with a ${statusCode} status and the following data`);
  logger.log(logger.INFO, JSON.stringify(data));

  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(data));
  response.end();
};

app.post('/new/user', (request, response) => {
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

app.get('/', (request, response) => {
  response.write('<!DOCTYPE><header></header><body><div><p>cool beans.</p></div></body></html>');
  response.end();
  return undefined;
});

// this allows to post as JSON or use query string.
app.post('/login', (request, response) => {
  const userID = (request.url.query.id) ? request.url.query.id : request.body.id;
  // pass false as 3rd param to avoid triggering deletion.
  validateAndReturnId(userID, response, false);

  return undefined;
});

// this allows just query string as get
app.get('/login', (request, response) => {
  const userID = (request.url.query.id) ? request.url.query.id : false;

  if (userID) {
    // pass false as 3rd param to avoid triggering deletion.
    validateAndReturnId(userID, response, false);
    response.end();
    return undefined;
  } // else if ID was not included...
  sendStatus(400, 'bad request: no id given.', response);
  response.end();
  return undefined;
});


app.delete('/', (request, response) => {
  const userID = (request.url.query.id) ? request.url.query.id : request.body.id;
  // delete is true
  validateAndReturnId(userID, response, true);
  return undefined;
});

app.get('/get/users', (request, response) => {
  const get = (request.url.query.getUsers) ? request.url.query.getUsers : request.body.getUsers;
  console.log(`get = ${get}`);
  if (get) {
    console.log('inside of get if statement...');
    //! development note: this would NEVER be done in real world...
    //   this is just to satisfy the assignment request with the scenario I choose
    let index = 0;
    const listToDisplay = {};
    while (userStorage.table[index]) {
      const user = userStorage.table[index].username;
      listToDisplay[`${user}`] = user;
      index += 1;
    }
    sendJSON(200, listToDisplay, response);
    return undefined;
  }
  console.log('before the write.');
  // response.end();
  return undefined;
});
