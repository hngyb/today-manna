const Sequelize = require('sequelize');
const config = require('../config');
const db = {};
const TodayManna = require('./todayManna');

const sequelize = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  {
    dialect: config.database.dialect,
    host: config.database.host,
    port: config.database.port,
  },
);

db.sequelize = sequelize;
db.TodayManna = TodayManna;

TodayManna.init(sequelize);
TodayManna.associate(sequelize);

module.exports = db;
