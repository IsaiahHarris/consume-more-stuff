// Imports
const express = require('express');
const Category = require('../db/models/Category');
const router = express.Router();

router.get('/', (req, res) => { // Returns all the category names
  return Category
    .fetchAll()
    .then(categories => {
      return res.json(categories);
    })
    .catch(err => {
      return res.json({ 'error': err.message })
    });
})

module.exports = router;