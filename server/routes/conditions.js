// Imports
const express = require('express');
const Condition = require('../db/models/Condition');
const router = express.Router();

router.get('/', (req, res) => { // Returns all the Conditions names
  return Condition
    .fetchAll()
    .then(conditions => {
      return res.json(conditions);
    })
    .catch(err => {
      return res.json({ 'error': err.message })
    });
})

module.exports = router;