import { TodayManna } from '../models';
import moment from 'moment';

export async function getMannaByDate(date) {
  const modified_date = moment(new Date(date)).format('YYYY-MM-DD');
  const manna = await TodayManna.findOne({
    attributes: ['verse', 'contents'],
    raw: true,
    pain: true,
    where: {
      date: modified_date,
    },
  });
  manna.contents = '[' + manna.contents.slice(1, -1) + ']';
  manna.contents = JSON.parse(manna.contents);
  return manna;
}
