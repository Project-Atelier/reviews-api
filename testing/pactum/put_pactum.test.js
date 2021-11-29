// make sure file name follows convention:
// something.test.js

const pactum = require('pactum');
const port = require('../../port.js');
const baseUrl = `http://localhost:${port}/`;
const helpfulUrl = baseUrl + 'reviews/1/helpful';
const reportUrl = baseUrl + 'reviews/1/report';


test('reply with 204 for marking helpful reviews', async () => {
  await pactum.spec()
    .put(helpfulUrl)
    .expectStatus(204);
});

test('reply with 204 for reporting review', async () => {
  await pactum.spec()
    .put(reportUrl)
    .expectStatus(204);
});
