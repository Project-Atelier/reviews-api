const { Sequelize, Model, DataTypes } = require('sequelize');
const { user, database, password } = require('./config.js');

const seq = new Sequelize(database, user, password, {
  dialect: 'postgres',
  host: '/var/run/postgresql',
  define: {
    timestamps: false
  },
  logging: false
});
  
// seq.authenticate().then(() => seq.sync({ force: true })).catch((error) => console.log(error));
// seq.authenticate().then(() => seq.sync({ alter: true })).catch((error) => console.log(error));
seq.authenticate().then(() => seq.sync()).catch((error) => console.log(error));
module.exports = seq;
