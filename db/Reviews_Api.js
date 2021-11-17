const Review = require('./Models/Review.js');
const Characteristic = require('./Models/Characteristic.js');
const Characteristic_Review = require('./Models/Characteristic_Review.js');
const Reviews_Photo = require('./Models/Reviews_Photo.js');
const Product = require('./Models/Product.js');

const getReviews = function(productId, sort, page, count) {
  let off = page * count - count;
  return Review.findAll({ 
    attributes: [
      review_id,
      rating,
      summary,
      recommend,
      response,
      body,
      date,
      reviewer_name,
      helpfulness,
    ],
    where: {
      product_id: productId
    },
    offset: off, 
    limit: count 
  });
}

const getMeta = async function(productId) {
  let ratingsObj = {};
  let recObj = {};

  let proms = [getRatings(productId).then((vals) => {
    for (var i = 0; i < vals.length; i++) {
      ratingsObj[i+1] = vals[i];
    }
  }),  
  getRecommended(productId).then((val) => {
    recObj[0] = val;
  })];
  await Promise.all(proms);
  return [ratingsObj, recObj];
}

const getRatings = function(productId) {
  let proms = [];
  for (var i = 1; i < 6; i++) {
    proms.push(Review.count({ 
      where: {
        product_id: productId,
        rating: i,
      },
    }));
  }
  return Promise.all(proms);
}
const getRecommended = function(productId) {
  return Review.count({ 
    where: {
      product_id: productId,
      recommend: true,
    },
  });
}
const getChars = function(productId) {
  return Characteristic.findAll({ 
    where: {
      product_id: productId
    },
  });
}

const getCharReviewAverage = function(charId) {
  let proms = [Characteristic_Review.count({ 
    where: {
      characteristic_id: charId
    },
  }),
  Characteristic_Review.sum('value', { 
    where: {
      characteristic_id: charId
    },
  })];
  return Promise.all(proms).then((vals) => {
    return vals[1]/vals[0];
  });
}


const addReview = function(obj) {
  obj.date = Date.now();
  return Review.create(obj);
}

const markHelpful = function(review_id) {
  return Review.increment('helpfulness', { 
    where: { review_id: review_id }
  });
}

const reportReview = function(review_id) {
  return Review.update({ reported: true }, { 
    where: { review_id: review_id }
  });
}

module.exports.getReviews = getReviews;
module.exports.addReview = addReview;
module.exports.getChars = getChars;
module.exports.getCharReviewAverage = getCharReviewAverage;
module.exports.getMeta = getMeta;
module.exports.markHelpful = markHelpful;
module.exports.reportReview = reportReview;