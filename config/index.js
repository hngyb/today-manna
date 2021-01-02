const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'production' ? '.env' : '.env.dev',
  ),
});

module.exports = {
  jbchId: process.env.JBCH_ID,
  jbchPw: process.env.JBCH_PW,
  database: {
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
};
