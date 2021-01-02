import { TodayManna } from '../models';
const { getTodayManna } = require('./getTodayManna');

export async function updateTodayManna() {
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
    console.error(err);
  }
}
