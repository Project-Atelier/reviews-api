const { Sequelize, Model, DataTypes } = require('sequelize');
const seq = require('../db.js');


class Product extends Model {}
Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  }, 
  slogan: {
    type: DataTypes.TEXT,
  },
  description: {
    type: DataTypes.TEXT,
  },
  category: {
    type: DataTypes.TEXT,
  },
  default_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }

}, {
  sequelize: seq
});


module.exports = Product;
