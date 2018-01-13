const mongoose = require('mongoose');

// Here ill have the time, temo, humidity, and movement 
var arDataSchema = mongoose.Schema({
    movementSensed: Boolean,
    temperature: Number,
    humidity: Number,
    timeStamp: Date
  });
  

module.exports =  mongoose.model('ArDataSchema', arDataSchema);