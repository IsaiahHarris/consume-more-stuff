const express = require('express');
const router = express.Router();

// These routes fetchs cards for the UserHomePage
// Add in a route to just get user_id if needed

router.get('/:user_id/published', (req, res) => {
  res.send('published user items!');
})

router.get('/:user_id/sold', (req, res) => {
  res.send('sold user items');
})

module.exports = router;