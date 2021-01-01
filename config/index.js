const env = require('dotenv');
env.config();

module.exports = {
  jbchId: process.env.JBCH_ID,
  jbchPw: process.env.JBCH_PW,
};
