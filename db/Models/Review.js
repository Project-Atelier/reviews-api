const { Sequelize, Model, DataTypes } = require('sequelize');
const seq = require('../db.js');
// const Reviews_Photo = require('./Reviews_Photo.js');
class Review extends Model {}

Review.init({
  review_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model:"Products",
      key: 'id'
    },
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
  indexes: [
    {
      fields: ['product_id']
    },
    {
      fields: ['rating']
    },
    {
      fields: ['recommend']
    },
    {
      fields: ['reported']
    }
  ],
  sequelize: seq
});

// Review.hasMany(Reviews_Photo, {foreignKey: 'review_id', sourceKey: 'review_id'});

module.exports = Review;
