const { Sequelize, Model, DataTypes } = require('sequelize');
const seq = require('../db.js');
const Characteristic = require('./Characteristic.js');
const Characteristic_Review = require('./Characteristic_Review.js');
const Reviews_Photo = require('./Reviews_Photo.js');
class Review extends Model {}

Review.init({
  review_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }, 
  date: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  summary: {
    type: DataTypes.TEXT,
    validate: {
      len: [0,60],
    },
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [50,1000],
    },
  },
  recommend: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  reported: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
    allowNull: false,
  },
  reviewer_name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1,60],
    },
  },
  reviewer_email: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [5,60],
    },
  },
  response: {
    type: DataTypes.TEXT,
  },
  helpfulness: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  }

}, {
  sequelize: seq
});

const getReviews = function(productId, page, count) {
  let off = page * count - count;
  return Review.findAll({ 
    where: {
      product_id: productId
    },
    offset: off, 
    limit: count 
  });
}

const getMeta = function(productId) {
  let ratingsObj = {};
  getRatings(productId).then((vals) => {
    for (var i = 0; i < vals.length; i++) {
      ratingsObj[i+1] = vals[i];
    }
  });
  let recObj = {};
  getRecommended(productId).then((val) => {
    recObj[0] = val;
  });
  
}

const getRatings = function(productId) {
  let proms = [];
  for (var i = 1; i < 6; i++) {
    proms.push(Review.count({ 
      where: {
        product_id: productId
        rating: i;
      },
    }));
  }
  return Promise.all(proms);
}
const getRecommended = function(productId) {
  return Review.count({ 
      where: {
        product_id: productId
        recommend: true;
      },
  );
}
const getChars = function(productId) {
  Characteristic.findAll({ 
    where: {
      product_id: productId
    },
  });
}


const addReview = function(obj) {
  obj.date = Date.now();
  return Review.create(obj);
}

module.exports = Review;
module.exports.getReviews = getReviews;
module.exports.addReview = addReview;

