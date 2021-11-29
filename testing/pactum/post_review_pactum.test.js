// make sure file name follows convention:
// something.test.js

const pactum = require('pactum');
const port = require('../../port.js');
const baseUrl = `http://localhost:${port}/`;
const postUrl = baseUrl + 'reviews';

test('should save a new user', async () => {
  await pactum.spec()
    .post(postUrl)
    .withJson({
      "product_id": 1,
      "rating": 1,
      "summary": "blahblahblah",
      "body": "blahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblah",
      "recommend": true,
      "name": "user1",
      "email": "user1@email.com",
      "photos": ["http://placecorgi.com/250"],
      "characteristics": {
          "1": 5,
          "2": 5,
          "3": 5,
          "4": 5
      }
  })
    .expectStatus(201);
});
