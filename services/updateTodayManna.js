const { TodayManna } = require('../models');
const { getTodayManna } = require('./getTodayManna');
const { logger } = require('../config/winston');

module.exports = async function updateTodayManna() {
  try {
    const today_manna = await getTodayManna();
    if (today_manna) {
      await TodayManna.create({
        verse: today_manna.verse,
        contents: today_manna.contents,
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    logger.error(err);
  }
};
