const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../db.js');

class Reviews extends Model {}

Reviews.init({
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
    type: DataTypes.DATE,
    allowNull: false,
  },
  summary: {
    type: DataTypes.TEXT,
    validate: {
      len: [0,60],
    },
  },
  summary: {
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
  sequelize: sequelize
});

module.export = Reviews;
