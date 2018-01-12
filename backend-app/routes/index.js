var express = require('express');
var axios = require('axios');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('data');
});

router.post('/data', function(req, res) {
  const arr = req.body.data.split(',')
  
  res.json(arr);
});

module.exports = router;