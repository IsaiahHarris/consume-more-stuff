const express = require('express');
const router = express.Router();

const conditions = require('./conditions');
const categories = require('./categories');
const itemStatuses = require('./itemStatuses');
const items = require('./items');
const auth = require('./auth');
const user = require('./user');

router.use('/conditions', conditions);
router.use('/categories', categories);
router.use('/itemStatuses', itemStatuses);
router.use('/items', items);
router.use('/', auth);
router.use('/user', user);

module.exports = router;
