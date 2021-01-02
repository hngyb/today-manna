const express = require('express');
const schedule = require('node-schedule');

const { sequelize } = require('./models');
const routes = require('./routes');
const { updateTodayManna } = require('./services/updateTodayManna');

// connect to DB
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB connected!');
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();
app.set('port', process.env.port || 9179);
app.listen(app.get('port'), () => {
  console.log('Server running on port:', app.get('port'));
});
app.use('/', routes);

// update today manna
schedule.scheduleJob('1 0 * * 1-6', async () => {
  try {
    let res = await updateTodayManna();
    if (!res) {
      setTimeout(async () => {
        res = await updateTodayManna();
        if (!res) {
          console.error('Manna not updated yet!');
        }
      }, 60000);
    }
  } catch (err) {
    console.error(err);
  }
});
