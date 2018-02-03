const express = require('express');
const axios = require('axios');
const ArData = require('../models/arData');
const router = express.Router();

router.get('/data', function (req, res) {
  ArData.find().sort({timeStamp:-1}).limit(50).exec((err, data) => {
    res.json(data);
  });
});

router.post('/data', function (req, res) {
  const d = new ArData();
  const data = req.body.data.split(',');
  d.movementSensed = data[0] === 'true'
  d.temperature = data[1]
  d.humidity = data[2]
  d.timeStamp = new Date();

  d.save((err, ardata) => {
    if (err) return console.error(err);
  });
  res.send(true);
});

module.exports = router;