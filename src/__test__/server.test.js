'use strict';

process.env.PORT = 4000;

const superagent = require('superagent');
const server = require('../lib/server');

let storeIDforJestTest;

describe('testing for user creation api', () => {
  storeIDforJestTest = { bgwest: '' };
  beforeAll(server.start);
  afterAll(server.stop);
  test('should respond with 200 status code and json of newly created user', () => {
    return superagent.post('http://localhost:4000/new/user')
      .set('Content-Type', 'application/json')
      .send({ //! development note: .send returns a promise
        username: 'bgwest',
        title: 'Sysadmin / Junior Developer',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual('bgwest');
        expect(response.body.title).toEqual('Sysadmin / Junior Developer');
        expect(response.body.timestamp).toBeTruthy();
        expect(response.body.id).toBeTruthy();
        storeIDforJestTest.bgwest = response.body.id;
      });
  });
  test('should respond with 200 status code and json of newly created username', () => {
    return superagent.get('http://localhost:4000/get/users?getUsers=true')
      .set('Content-Type', 'application/json')
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(typeof response.body).toEqual('object');
        expect(response.body.bgwest).toEqual('bgwest');
      });
  });
  test('should respond with 400 status code if there is no title', () => {
    return superagent.post('http://localhost:4000/new/user')
      .set('Content-Type', 'application/json')
      .send({
        username: 'only a username wont cut it -- this will fail',
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  test('should respond with \'bad request\' if no request body was provided given at all.', () => {
    return superagent.post('http://localhost:4000/new/user')
      .set('Content-Type', 'application/json')
      .send('')
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
        expect(response.response.text).toEqual('.catch() : router.js');
      });
  });
  test('for \'valid requests\' made with an id that was not found, should respond with 404 \'not found\'', () => {
    return superagent.get('http://localhost:4000/login?id=bad-id')
      .set('Content-Type', 'text/plain')
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(404);
        expect(response.response.text).toEqual('Not found (Bad query): ensure the id you are sending is valid.');
      });
  });
  test('if no id was provided, should return bad request with 400 status', () => {
    return superagent.get('http://localhost:4000/login')
      .set('Content-Type', 'text/plain')
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
        expect(response.response.text).toEqual('Responding with a 400 status code due to bad request: no id given.');
      });
  });
  test('if valid ID is given ensure correct username is returned with 200 status', () => {
    return superagent.get(`http://localhost:4000/login?id=${storeIDforJestTest.bgwest}`)
      .set('Content-Type', 'application/json')
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Hello, bgwest.');
      });
  });
});
