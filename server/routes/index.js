const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Smoke test at index.js');
})

module.exports = router;