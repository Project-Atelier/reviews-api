const { Sequelize, Model, DataTypes } = require('sequelize');
const seq = require('../db.js');

class Characteristic_Review extends Model {}

Characteristic_Review.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  review_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model:"Reviews",
      key: 'review_id'
    },
  },
  characteristic_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model:"Characteristics",
      key: 'id'
    },
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },

}, {
  sequelize: seq
});

module.exports = Characteristic_Review;
