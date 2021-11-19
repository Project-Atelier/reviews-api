// make sure file name follows convention:
// something.test.js

const pactum = require('pactum');



test('return review metadata with code 200', async () => {
  await pactum.spec()
    .get('http://localhost:3000/reviews/meta?product_id=40344')
    .expectStatus(200)
});

test('return review metadata with ratings property', async () => {
  await pactum.spec()
    .get('http://localhost:3000/reviews/meta?product_id=40344')
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
    .get('http://localhost:3000/reviews/meta?product_id=40344')
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
    .get('http://localhost:3000/reviews/meta?product_id=40344')
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