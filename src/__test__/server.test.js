'use strict';

const superagent = require('superagent');
const server = require('../lib/server');

describe('/api/notes', () => {
  beforeAll(server.start);

  test('should respond with 200 status code and a new json note', () => {
    return superagent.post('http://localhost:3000/api/notes')
        .set('Content-Type', 'application/json')
        .send({ //! Vinicio .send returns a promise
          title: 'Gregor',
          content: 'is cute',
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.content).toEqual('is cute');
          expect(response.body.title).toEqual('Gregor');

          expect(response.body.timestamp).toBeTruthy();
          expect(response.body.id).toBeTruthy();
        });
  });
  test('should respond with 400 status code if there is no title', () => {
    return superagent.post('http://localhost:3000/api/notes')
        .set('Content-Type', 'application/json')
        .send({ //! Vinicio .send returns a promise
          content: 'is cute',
        })
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(400);
        });
  });
});