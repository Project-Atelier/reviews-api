const express = require('express');
const seq = require('../db/db.js');
const Review_Api = require('../db/Reviews_Api.js');
const app = express();
app.use(express.json());
const port = 3000;

app.get('/reviews', (req, res) => {
  let count = 5;
  let page = 1;
  if (req.query.count) {
    count = parseInt(req.query.count);
  }
  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  let productId = parseInt(req.query.product_id);
  let sort = req.query.sort;

  let resObj = {};
  resObj.product = productId;
  resObj.page = page;
  resObj.count = count;
  Review_Api.getReviews(productId, sort, page, count).then((results) => {
    res.json(results);
  }).catch((error) => {
    console.log(error);
    res.status(500);
    res.send(error);
  });
});

app.get('/reviews/meta', (req, res) => {
  let productId = parseInt(req.query.product_id);
  let resObj = {};
  resObj.product = productId;

  Review_Api.getMeta(productId).then((results) => {
    resObj.ratings = results[0];
    resObj.recommended = results[1];
    res.json(resObj);
  }).catch((error) => {
    console.log(error);
    res.status(500);
    res.send(error);
  });
});

app.put('/reviews/:review_id/helpful', (req, res) => {
  Review_Api.addReview(req.params.review_id).then((results) => {
    res.sendStatus(204);
  }).catch((error) => {
    console.log(error);
    res.status(500);
    res.send(error);
  });
});

app.put('/reviews/:review_id/report', (req, res) => {
  
  Review_Api.reportReview(req.params.review_id).then((results) => {
    res.sendStatus(201);
  }).catch((error) => {
    console.log(error);
    res.status(500);
    res.send(error);
  });
});

app.post('/reviews', (req, res) => {
  Review_Api.addReview(req.body).then((results) => {
    // console.log(results);
    res.sendStatus(201);
  }).catch((error) => {
    console.log(error);
    res.status(500);
    res.send(error);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
