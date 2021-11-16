const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../db.js');

class Characteristics extends Model {}

Characteristics.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

}, {
  sequelize: sequelize
});

module.export = Characteristics;
