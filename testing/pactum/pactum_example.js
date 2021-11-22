// make sure file name follows convention:
// something.test.js

const pactum = require('pactum');

test('should be a teapot', async () => {
  await pactum.spec()
    .get('http://httpbin.org/status/418')
    .expectStatus(418);
});

test('should save a new user', async () => {
  await pactum.spec()
    .post('https://jsonplaceholder.typicode.com/users')
    .withHeaders('Authorization', 'Basic xxxx')
    .withJson({
      name: 'bolt',
      email: 'bolt@swift.run'
    })
    .expectStatus(201);
});
