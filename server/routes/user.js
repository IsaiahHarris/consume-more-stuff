const express = require('express');
const router = express.Router();
const Item = require('../db/models/Item');

// These routes fetchs cards for the UserHomePage
// Add in a route to just get user_id if needed

// This route fetches "published" items by userId
router.get('/:user_id/published', (req, res) => {
  const userId = req.params.user_id;

  return Item
    .query(qb => {
      qb.where({'seller_id': userId})
        .andWhere({'item_status_id': 1 });
    })
    .fetchAll({ withRelated: ['seller', 'category', 'condition', 'itemStatus'] })
      .then(items => {
        return res.json(items);
      })
      .catch(err => {
        return res.json({ 'error': err.message })
      });
})

// This route returns "sold" items by userId
router.get('/:user_id/sold', (req, res) => {
  const userId = req.params.user_id;

  return Item
  .query(qb => {
    qb.where({'seller_id': userId})
      .andWhere({'item_status_id': 2 });
  })
  .fetchAll({ withRelated: ['seller', 'category', 'condition', 'itemStatus'] })
    .then(items => {
      return res.json(items);
    })
    .catch(err => {
      return res.json({ 'error': err.message })
    });
})

module.exports = router;