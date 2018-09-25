'use strict';

const http = require('http');
const logger = require('./logger');
const router = require('./router');
require('dotenv').config();
require('../routes/trees-router');

const app = http.createServer(router.findAndExecuteRoutes);

//-------------------------------------------------

const server = module.exports = {};

/**
 *
 * @param port port where we want to start the server
 * @returns the result of app.listen
 */
// server.start = (port = 4000) => {
//   //! Vinicio - the next line will start the server and make it listen to request
//   return app.listen(port, () => {
//     logger.log(logger.INFO, `Server is on at PORT: ${port}`);
//   });
// };


let internalServer = null;

server.start = () => {
  //! Vinicio - the next line will start the server and make it listen to request
  internalServer = app.listen(process.env.PORT, () => {
    logger.log(logger.INFO, `Server is on at PORT: ${process.env.PORT}`);
  });
};

server.stop = () => {
  internalServer.close(() => {
    logger.log(logger.INFO, 'The server is OFF.');
  });
};

// server.stop = (callback) => {
// };
