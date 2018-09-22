'use strict';

const url = require('url');
const queryString = require('querystring');
const logger = require('./logger');

const requestParser = module.exports = {};

/**
 * Request parser WILL parse the bodies of POST and PUT requests.
 * @param request
 * @returns {Promise<any>}
 */
requestParser.parseAsync = (request) => {
  //! Vinicio - This request will be a RAW NODE HTTP Request
  //! Vinicio - this function returns a new promise so that I can do
  // parse(...).then() in a different file.
  return new Promise((resolve, reject) => {
    let completeBody = '';

    request.url = url.parse(request.url);
    logger.log(logger.INFO, `Request URL path: ${Object.keys(request.url)}`);

    //! https://nodejs.org/api/querystring.html
    request.url.query = queryString.parse(request.url.query);
    logger.log(logger.INFO, `Query string(s): ${Object.keys(request.url.query)}`);

    console.log(request.url);
    console.log(request.url.query);

    if (request.method !== 'POST' && request.method !== 'PUT') {
      logger.log(logger.INFO, `Method sent: ${request.method}`);
      return resolve(request);
    }

    //! development-note: requests come in more than one piece
    //    request.on happens when we get new pieces of data
    request.on('data', (buffer) => {
      completeBody += buffer.toString();
    });

    //! Vinicio - this happens once we get ALL the pieces
    request.on('end', () => {
      try {
        //! Vinicio - for now, we are going to assume the body is ALWAYS going to be JSON
        //! Vinicio - I'm adding a body property to the request object because
        // that's the way express does things.
        logger.log(logger.INFO, `Trying to end ${request.method} request`);
        // if (request.body) {
        // avoid errors if body doesn't exist.
        request.body = JSON.parse(completeBody);
        logger.log(logger.INFO, `Found request.body: ${request.body}`);
        // return resolve(request);
        // }
        // logger.log(logger.INFO, 'No body found and parsing skipped.');
        return resolve(request);
      } catch (error) {
        //! Vinicio - we reject here because when we return a new promise
        // we MUST to to call EITHER reject or resolve.
        return reject(error);
      }
    });
    return undefined;
  });
};
