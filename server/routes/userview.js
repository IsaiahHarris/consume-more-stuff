const express = require('express');
const router = express.Router();

router.get('/userview', (req, res) => {
  res.send('userview smoke test!');
})

module.exports = router;