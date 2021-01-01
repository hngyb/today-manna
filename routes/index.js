const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.get('/api/v1/today-manna', controllers.getManna);

module.exports = router;
