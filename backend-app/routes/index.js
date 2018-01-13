var express = require('express');
var axios = require('axios');
var router = express.Router();
const ArData = require('../models/arData');

router.get('/', function(req, res) {
  res.send('data');
});

router.post('/data', function(req, res) {
  const d = new ArData();
  console.log(req.body);
  // const arr = req.body.data.split(',');
  // res.json(arr);
  res.send(req.body);
});

// var Kitten = mongoose.model('Kitten', kittySchema);

// var silence = new Kitten({
//   name: 'Silence'
// });
// var fluffy = new Kitten({
//   name: 'fluffy'
// });

// console.log(silence.name); // 'Silence'
// fluffy.speak(); // "Meow name is fluffy"

// fluffy.save(function (err, fluffy) {
//   if (err) return console.error(err);
//   fluffy.speak();
// });

module.exports = router;