const { Sequelize, Model, DataTypes } = require('sequelize');
const seq = require('../db.js');

class Characteristic extends Model {
  
}

Characteristic.init({
  id: {
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
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  value: {
    type: DataTypes.DECIMAL,
  }
}, {
  indexes: [
    {
      fields: ['product_id']
    }
  ],
  sequelize: seq
});

module.exports = Characteristic;
