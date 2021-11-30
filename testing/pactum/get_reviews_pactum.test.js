// make sure file name follows convention:
// something.test.js

const pactum = require('pactum');
const port = require('../../port.js');
const baseUrl = `http://localhost:${port}/`;
const reviewsUrl = baseUrl + 'reviews/?product_id=40344';


test('return reviews with code 200', async () => {
  await pactum.spec()
    .get(reviewsUrl)
    .expectStatus(200)
});

test('return reviews with results property', async () => {
  await pactum.spec()
    .get(reviewsUrl)
    .expectBodyContains('results');
});

test('results should contain reviews', async () => {
  await pactum.spec()
    .get(reviewsUrl)
    .expectJsonLike({
      product: 40344,
      page: 1,
      count: 5,
      results: [
        {
          review_id: 'typeof $V === "number"',
          rating: 'typeof $V === "number"',
          summary: 'typeof $V === "string"',
          recommend: 'typeof $V === "boolean"',
          response: '(["string","object"].indexOf(typeof $V) >= 0)',
          body: 'typeof $V === "string"',
          date: 'typeof $V === "string"',
          reviewer_name: 'typeof $V === "string"',
          helpfulness: 'typeof $V === "number"',
          photos: 'Array.isArray($V)'
        }
      ]
    });
});
