const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../db.js');

class Reviews_Photos extends Model {}

Reviews_Photos.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  review_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

}, {
  sequelize: sequelize
});

module.export = Reviews_Photos;
