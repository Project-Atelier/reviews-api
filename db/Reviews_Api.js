const Review = require('./Models/Review.js');
const Characteristic = require('./Models/Characteristic.js');
const Characteristic_Review = require('./Models/Characteristic_Review.js');
const Reviews_Photo = require('./Models/Reviews_Photo.js');
const Product = require('./Models/Product.js');
const moment = require('moment');
const Sequelize = require('sequelize');

const getReviews = function(productId, sort, page, count) {
  let off = page * count - count;
  let sorter = [];
  if (sort === 'helpful') {
    sorter = [['helpfulness', 'DESC']];
  } else if (sort === 'relevant') {
    sorter = [[Sequelize.literal('helpfulness * 86400000 + date'), 'DESC']];
  } else {
    sorter = [['date', 'DESC']];
  }
  return Review.findAll({ 
    attributes: [
      'review_id',
      'rating',
      'summary',
      'recommend',
      'response',
      'body',
      'date',
      'reviewer_name',
      'helpfulness',
    ],
    where: {
      product_id: productId,
      reported: false
    },
    order: sorter,
    offset: off, 
    limit: count 
  }).then((results) => {
    let proms = [];
    for (let i = 0; i < results.length; i++) {
      results[i].date = moment(parseInt(results[i].date)).toISOString();
      proms.push(Reviews_Photo.findAll( { 
        attributes: [
          'id',
          'url',
        ],
        where: {
          review_id: results[i].review_id,
        }
      }));
    }
    return Promise.all(proms).then((photos) => {
      for (let i = 0; i < results.length; i++) {
        let temp = [];
        for (let j = 0; j < photos[i].length; j++) { 
          temp.push(photos[i][j].dataValues);
        }
        results[i].dataValues.photos = temp.slice();
      }
      return results;
    });
  });
}

const getMeta = async function(productId) {
  let results = await Promise.all([getRatings(productId).then((vals) => {
    let ratingsObj = {};
    for (var i = 0; i < vals.length; i++) {
      if (vals[i] > 0) {
        ratingsObj[i+1] = vals[i];
      }
    }
    return ratingsObj;
  }),  
    getRecommendedObj(productId),
    getMetaChars(productId)
  ]);
  let resObj = {};
  resObj.ratings = results[0];
  resObj.recommended = results[1];
  resObj.characteristics = results[2];
  return resObj;
}

//#region meta helpers
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

const getRecommendedObj = function(productId) {
  return Promise.all([
    getRecommended(productId),
    getNotRecommended(productId)
  ]).then((results) => {
    return {true: results[0], false: results[1]};
  });
}
const getRecommended = function(productId) {
  return Review.count({ 
    where: {
      product_id: productId,
      recommend: true,
    },
  });
}
const getNotRecommended = function(productId) {
  return Review.count({ 
    where: {
      product_id: productId,
      recommend: false,
    },
  });
}

const getMetaChars = async function(product_id) {
  let chars = await getChars(product_id);
  let avs = await Promise.all(chars.map((char) => {
      return getCharReviewAverage(char.id);
    }
  ));
  let obj = {};
  for (let i = 0; i < chars.length; i++) {
    obj[chars[i].dataValues.name] = {
      id: chars[i].dataValues.id,
      value: avs[i]
    };
  }
  return obj;
}

const getChars = function(productId) {
  return Characteristic.findAll({ 
    attributes: [
      'id',
      'name'
    ],
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
//#endregion

const addReview = function(obj) {
  let newObj = {};
  newObj.review_id = null;
  newObj.product_id = obj.product_id;
  newObj.rating = obj.rating;
  newObj.date = Date.now();
  newObj.summary = obj.summary;
  newObj.body = obj.body;
  newObj.recommend = obj.recommend;
  // newObj.reported = null;
  newObj.reviewer_name = obj.name;
  newObj.reviewer_email = obj.email;
  newObj.response = null;
  // newObj.helpfulness = 0;

  return Review.create(newObj)
  .then((result) => {
    let proms = [];
    let rid = result.dataValues.review_id;
    if (obj.photos) {
      // console.log(obj.photos);
      for (var i = 0; i < obj.photos.length; i++) {
        proms.push(Reviews_Photo.create({ review_id: rid, url: obj.photos[i]}));
      }
    }
    let chars = Object.keys(obj.characteristics);
    let vals = Object.values(obj.characteristics);
    for (var j = 0; j < chars.length; j++) {
      proms.push(Characteristic_Review.create({ review_id: rid, value: vals[j], characteristic_id: parseInt(chars[j])}))
    }
    return Promise.all(proms);
  });
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
module.exports.getMeta = getMeta;
module.exports.markHelpful = markHelpful;
module.exports.reportReview = reportReview;