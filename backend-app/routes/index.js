var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home page', x : '1' });
});

router.get('/t', (req,res,next) => {
  res.render('index', {title: 'User page', x: '4'})
});

router.post('/', (req, res) => {
  res.send("post_sent");
});

module.exports = router;
