const { Sequelize, Model, DataTypes } = require('sequelize');
const { user, database, password } = require('./config.js');

const sequelize = new Sequelize(database, user, password, {
  dialect: 'postgres',
  host: '/var/run/postgresql'
});

sequelize.authenticate().catch((error) => console.log(error));

module.export = sequelize;
