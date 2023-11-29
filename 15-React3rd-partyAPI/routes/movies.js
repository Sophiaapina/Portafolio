
const express = require('express');
const router = express.Router();
const moviesData = require('../public/data');

router.get('/', (req, res) => {
  res.json(moviesData);
});

module.exports = router;
