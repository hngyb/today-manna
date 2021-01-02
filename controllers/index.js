const { getMannaByDate, getLatestManna } = require('../services/getManna');

exports.getManna = async (req, res, next) => {
  const date = req.params.date;
  const manna = await getMannaByDate(date);
  if (manna) {
    res.json(manna);
  } else {
    res.status(404).json({ errorMessage: 'Cannot get Manna' });
  }
};

exports.getLatestManna = async (req, res, next) => {
  const manna = await getLatestManna();
  if (manna) {
    res.json(manna);
  } else {
    res.status(404).json({ errorMessage: 'Cannot get Manna' });
  }
};
