const express = require('express');
const schedule = require('node-schedule');

const routes = require('./routes');

const app = express();
app.set('port', process.env.port || 3000);
app.listen(app.get('port'), () => {
  console.log('Server running on port:', app.get('port'));
});
app.use('/', routes);

schedule.scheduleJob('0 0 * * 1-6', async () => {
  app.use('/', routes);
});
