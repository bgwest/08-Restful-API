'use strict';

//! Vinicio - I'm using capital U because User is a class
const path = require('path');
const fs = require('fs');
const User = require('../model/user-template');
const app = require('../lib/router');
const logger = require('../lib/logger');

const userStorage = {
  table: [],
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
app.post('/api/notes', (request, response) => { //! Vinicio - this is what gets passed as callback
  //! Vinicio - at this point we know
  // - we have a post request : the user wants to create a new user
  // - the request has bee matched to this function

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
  userStorage.table.push(user); //! Vinicio - eventually, we'll add the note into our DB
  sendJSON(200, user, response);
  return undefined;
});

app.post('/get/id', (request, response) => {
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
  //! Vinicio - making sure I have all the information I need to create a new user
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
  userStorage.table.push(user); //! Vinicio - eventually, we'll add the note into our DB
  sendJSON(200, user, response);
  return undefined;
});

const writeUserFile = (data, callback) => {
  const dataFile = path.join(__dirname, '../data/user.session.json');
  fs.writeFile(`${dataFile}`, data, (error) => {
    if (error) {
      throw error;
    }
    return callback;
  });
};

app.get('/', (request, response) => {
  const stringIfyUserStorage = JSON.stringify(userStorage);
  logger.log(logger.INFO, `userStorage = ${stringIfyUserStorage}`);
  // fs.writeFile('data.json', '{"testing":"123"}', (err) => {
  //   if (err) throw err;
  //   console.log('Updated user file.');
  // });
  writeUserFile(stringIfyUserStorage);

  sendJSON(200, '../data/data.json', response);
});
