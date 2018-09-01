const express = require('express');
const categories = require('./categories');
const items = require('./items');
const auth = require('./auth')
const router = express.Router();

router.use('/conditions')
router.use('/categories', categories);
router.use('/items', items);
router.use('/', auth);

module.exports = router;