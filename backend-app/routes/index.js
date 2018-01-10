var express = require('express');
var axios = require('axios');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('juan is my daddy');
});

router.get('/data', function(req, res) {
  res.post();
});

module.exports = router;