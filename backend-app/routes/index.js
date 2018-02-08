const express = require('express');
const axios = require('axios');
const ArData = require('../models/arData');
const router = express.Router();
const exec = require('child_process').exec;

router.get('/data', function (req, res) {
  ArData.find().sort({_id:-1}).limit(50).exec((err, data) => {
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
  if(d.movementSensed === true){
    var yourscript = exec('sh test.sh',
        (error, stdout, stderr) => {
            console.log(`${stdout}`);
            console.log(`${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
  }
  d.save((err, ardata) => {
    if (err) return console.error(err);
  });
  res.send(true);
});

module.exports = router;