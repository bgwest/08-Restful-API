'use strict';

//! Vinicio - I'm using capital N because Note is a class
const Note = require('../model/note');
const app = require('../lib/router');
const logger = require('../lib/logger');

const noteStorage = []; //! Vinicio - this will become a MONGO DB

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
                                                // - we have a post request : the user wants to create a new note
                                                // - the request has bee matched to this function

  // ALGO:
  // validate all the input (i.e. request)
  // create a note
  //----------------------------------------------------------------------------------
  // REQUEST VALIDATION
  //----------------------------------------------------------------------------------
  if (!request.body) {
    sendStatus(400, 'body not found', response);
    return undefined;
  }
  //! Vinicio - making sure I have all the information I need to create a new note
  if (!request.body.title) {
    sendStatus(400, 'title not found', response);
    return undefined;
  }

  if (!request.body.content) {
    sendStatus(400, 'content not found', response);
    return undefined;
  }
  //----------------------------------------------------------------------------------
  // NOTE CREATION
  //----------------------------------------------------------------------------------
  const note = new Note(request.body.title, request.body.content);
  noteStorage.push(note); //! Vinicio - eventually, we'll add the note into our DB
  sendJSON(200, note, response);
  return undefined;
});
