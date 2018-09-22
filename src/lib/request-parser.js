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
    logger.log(logger.INFO, `Original URL: ${request.url}`);

    //! https://nodejs.org/docs/latest/api/url.html
    request.url = url.parse(request.url);
    //! https://nodejs.org/api/querystring.html
    request.url.query = queryString.parse(request.url.query);

    console.log('request url:');
    console.log(request.url);
    console.log('request url query:');
    console.log(request.url.query);

    if (request.method !== 'POST' && request.method !== 'PUT') {
      return resolve(request); //! Vinicio - resolving the promise
    }
    let completeBody = '';
    //! Vinicio - we need these 2 events because the request is coming in more than one piece
    //! Vinicio -  this happens when we get a new piece
    request.on('data', (buffer) => {
      completeBody += buffer.toString();
    });
    //! Vinicio - this happens once we get ALL the pieces
    request.on('end', () => {
      try {
        //! Vinicio - for now, we are going to assume the body is ALWAYS going to be JSON
        //! Vinicio - I'm adding a body property to the request object because
        // that's the way express does things.
        request.body = JSON.parse(completeBody);
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
