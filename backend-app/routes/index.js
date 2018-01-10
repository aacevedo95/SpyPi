var express = require('express');
var router = express.Router();

var SerialPort = require('serialport');
var sp = new SerialPort("COM6",{ baudRate: 250000});
// serial port for Arduino comms
sp.on("open", function () {
  console.log('Communication is on!');

  // when your app receives data, this event is fired
  // so you can capture the data and do what you need
  sp.on('data', function(data) {
    console.log('data received: ' + data);
  });
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home page', x : '1' });
});

router.get('/t', (req,res,next) => {
  res.render('index', {title: 'User page', x: '4',  ardData : data })
});

router.post('/', (req, res) => {
  res.send("post_sent");
});

module.exports = router;
