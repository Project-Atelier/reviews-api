// make sure file name follows convention:
// something.test.js

const pactum = require('pactum');

test('reply with 204 for marking helpful reviews', async () => {
  await pactum.spec()
    .put('http://localhost:3000/reviews/1/helpful')
    .expectStatus(204);
});

test('reply with 204 for reporting review', async () => {
  await pactum.spec()
    .put('http://localhost:3000/reviews/1/report')
    .expectStatus(204);
});
