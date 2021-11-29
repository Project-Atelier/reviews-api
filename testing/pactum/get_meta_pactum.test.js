// make sure file name follows convention:
// something.test.js
const port = require('../../port.js');
const pactum = require('pactum');

const baseUrl = `http://localhost:${port}/`;
const metaUrl =  baseUrl + 'reviews/meta?product_id=40344';

test('return review metadata with code 200', async () => {
  await pactum.spec()
    .get(metaUrl)
    .expectStatus(200)
});

test('return review metadata with ratings property', async () => {
  await pactum.spec()
    .get(metaUrl)
    .expectJsonLike({
      ratings: 
        {
          1: 'typeof $V === "number"',
          2: 'typeof $V === "number"',
          3: 'typeof $V === "number"',
          4: 'typeof $V === "number"',
          5: 'typeof $V === "number"',
        }
    });
});

test('return review metadata with recommended property', async () => {
  await pactum.spec()
    .get(metaUrl)
    .expectJsonLike({
      recommended: 
        {
          true: 'typeof $V === "number"',
          false: 'typeof $V === "number"',
        }
    });
});

test('return review metadata with characteristics property', async () => {
  await pactum.spec()
    .get(metaUrl)
    .expectJsonLike({
      characteristics: 
        {
          Quality: {
            id: 'typeof $V === "number"',
            value: 'typeof $V === "number"'
          }
        }
    });
});