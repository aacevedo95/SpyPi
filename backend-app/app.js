var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var mongoose = require('mongoose');
var fs = require('fs')
var app = express();


// mongoose db
const connString = JSON.parse(fs.readFileSync('private.json')).connString
mongoose.connect('mongodb://localhost:4000/data');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

// Here ill have the time, temo, humidity, and movement 
var kittySchema = mongoose.Schema({
  name: String
});

// function that returns the .name of each model(?)
kittySchema.methods.speak = function () {
  var greeting = this.name ?
    "Meow name is " + this.name :
    "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({
  name: 'Silence'
});
var fluffy = new Kitten({
  name: 'fluffy'
});

console.log(silence.name); // 'Silence'
fluffy.speak(); // "Meow name is fluffy"

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});

// express
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.set('view engine', 'html');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;