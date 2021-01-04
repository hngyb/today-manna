const express = require('express');
const schedule = require('node-schedule');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');

const { logger } = require('./config/winston');
const { sequelize } = require('./models');
const routes = require('./routes');
const { updateTodayManna } = require('./services/updateTodayManna');

// connect to DB
sequelize
  .sync({ force: false })
  .then(() => {
    logger.info('DB connected!');
  })
  .catch((err) => {
    logger.error(err);
  });

const app = express();
app.set('port', process.env.port || 9179);

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(morgan('dev'));
}

app.use('/', routes);

app.listen(app.get('port'), () => {
  console.log('Server running on port:', app.get('port'));
});

// update today manna
schedule.scheduleJob('1 0 * * 1-6', async () => {
  try {
    let res = await updateTodayManna();
    if (!res) {
      setTimeout(async () => {
        res = await updateTodayManna();
        if (!res) {
          logger.error('Manna not updated yet!');
        }
      }, 60000);
    }
  } catch (err) {
    logger.error(err);
  }
});

schedule.scheduleJob('0 5 * * 1-6', async () => {
  try {
    let res = await updateTodayManna();
    if (!res) {
      setTimeout(async () => {
        res = await updateTodayManna();
        if (!res) {
          logger.error('Manna not updated yet!');
        }
      }, 60000);
    }
  } catch (err) {
    logger.error(err);
  }
});
