const { getTodayManna } = require('../services/getTodayManna');

exports.getManna = async (req, res, next) => {
  const todayManna = await getTodayManna();
  if (todayManna) {
    res.json(todayManna);
  } else {
    res.status(404).json({ errorMessage: 'Not Updated yet' });
  }
};
