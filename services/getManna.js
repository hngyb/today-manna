const { TodayManna } = require('../models');
const moment = require('moment');

export async function getMannaByDate(date) {
  const modified_date = moment(new Date(date)).format('YYYY-MM-DD');
  const manna = await TodayManna.findOne({
    attributes: ['date', 'verse', 'contents'],
    raw: true,
    where: {
      date: modified_date,
    },
  });
  manna.contents = '[' + manna.contents.slice(1, -1) + ']';
  manna.contents = JSON.parse(manna.contents);
  return manna;
}

export async function getLatestManna() {
  const max_date = await TodayManna.max('date');
  const manna = await TodayManna.findOne({
    attributes: ['date', 'verse', 'contents'],
    raw: true,
    where: {
      date: max_date,
    },
  });
  manna.contents = '[' + manna.contents.slice(1, -1) + ']';
  manna.contents = JSON.parse(manna.contents);
  return manna;
}
