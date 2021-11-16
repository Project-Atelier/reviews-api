const express = require('express');
const seq = require('../db/db.js');
const Review_Api = require('../db/Reviews_Api.js');
const app = express();
const port = 3000;

// Review.getChars(5).then((results) => {
//   console.log(results);
// });

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

// Review_Api.getCharReviewAverage(2).then((results) => {
//   console.log(results);
// }).catch((err) => {
//   console.log(err);
// });
