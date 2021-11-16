const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../db.js');

class Characteristic_Reviews extends Model {}

Characteristic_Reviews.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  review_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  characteristic_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  sequelize: sequelize
});

module.export = Characteristic_Reviews;
