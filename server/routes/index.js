const express = require('express');
const categories = require('./categories');
const items = require('./items');
const router = express.Router();

router.use('/categories', categories);
router.use('/items', items);

module.exports = router;