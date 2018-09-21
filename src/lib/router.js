'use strict';

const logger = require('./logger');
const requestParser = require('./request-parser');

const routeHandlers = {
  POST: {},
  GET: {},
  PUT: {},
  DELETE: {},
};

const router = module.exports = {};

const logRouteAndCallback = (method, route) => {
  logger.log(logger.INFO, `Adding a ${method} handler on the '${route}' route`);
  // logger.log(logger.INFO, callback.toString());
};
//-------------------------------------------------------------------------------
// These functions are to add new routes
//-------------------------------------------------------------------------------
router.get = (route, callback) => {
  routeHandlers.GET[route] = callback;
  logRouteAndCallback('GET', route);
};

router.put = (route, callback) => {
  routeHandlers.PUT[route] = callback;
  logRouteAndCallback('PUT', route);
};

router.post = (route, callback) => {
  routeHandlers.POST[route] = callback;
  logRouteAndCallback('POST', route);
};

router.delete = (route, callback) => {
  routeHandlers.DELETE[route] = callback;
  logRouteAndCallback('DELETE', route);
};
//-------------------------------------------------------------------------------
// This function is going to find and execute callbacks, and it's going to be
// tied to the listen function in the server.
//-------------------------------------------------------------------------------
router.findAndExecuteRoutes = (request, response) => {
  //! Algo
  // Find a handler (if we have one);
  // if handler is found
  //  call it
  // else
  //  return a 404 error
  logger.log(logger.INFO, 'Routing a Request');
  requestParser.parseAsync(request) //! Vinicio - then matches to resolve()
      .then((parsedRequest) => {
        const handler = routeHandlers[parsedRequest.method][parsedRequest.url.pathname];
        logger.log(logger.INFO, 'Found the following handler');
        logger.log(logger.INFO, handler.toString());

        if (handler) {
          return handler(parsedRequest, response);
          //! Vinicio - in this if statement, I can assume that handler contains a function
        }
        response.writeHead(404);
        response.end();
        return undefined;
      }).catch(() => {
    logger.log(logger.INFO, 'Responding back with 400 status code');
    response.writeHead(400, { 'Content-Type': 'text/plain' });
    response.write('Bad Request');
    response.end();
    return undefined;
  });
};
