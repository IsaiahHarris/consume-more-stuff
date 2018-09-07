// Imports
const express = require('express');
const ItemStatus = require('../db/models/ItemStatus');
const router = express.Router();

router.get('/', (req, res) => {
  return ItemStatus
    .fetchAll()
    .then(itemStatuses => {
      return res.json(itemStatuses);
    })
    .catch(err => {
      return res.json({ error: err.message });
    });
});

module.exports = router;
