import { TodayManna } from '../models';
import moment from 'moment';

export async function getMannaByDate(date) {
  const modified_date = moment(new Date(date)).format('YYYY-MM-DD');
  const manna = await TodayManna.findOne({
    attributes: ['verse', 'contents'],
    raw: true,
    where: {
      date: modified_date,
    },
  });
  return manna;
}
