const express = require('express');
const router = express.Router();

const conditions = require('./conditions');
const categories = require('./categories');
const items = require('./items');
const auth = require('./auth')

router.use('/conditions', conditions)
router.use('/categories', categories);
router.use('/items', items);
router.use('/', auth);

module.exports = router;
