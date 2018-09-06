const express = require('express');
const router = express.Router();

const conditions = require('./conditions');
const categories = require('./categories');
const items = require('./items');
const auth = require('./auth')
const s3Upload = require('./s3Upload');
const user = require('./user')
router.use('/conditions', conditions)
router.use('/categories', categories);
router.use('/items', items);
router.use('/', auth);
router.use('/', s3Upload);
router.use('/user', user)

module.exports = router;
