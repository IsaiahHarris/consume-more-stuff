const express = require('express');
const router = express.Router();
const Items = require('../db/models/Item');

router.route('/')
  .get((req, res) => { // Fetches all the items
    return Items.fetchAll() // Need to include a where depending on  category
      .then(items => {
        res.json(items);
      })
      .catch(err => {
        res.json({ 'error': err.message })
      });
    // res.send('smoke test 2 items');
  });

module.exports = router;