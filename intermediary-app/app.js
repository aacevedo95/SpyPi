const SerialPort = require('serialport');
const axios = require('axios');
const sp = new SerialPort("COM3",{ baudRate: 250000});

// serial port for Arduino comms
sp.on("open",  () => {
  console.log('Communication is on!');

  // when your app receives data, this event is fired
  // so you can capture the data and do what you need
  sp.on('data', (data) => {
    console.log('data received: ' + data);
    axios.post('localhost:4000/data', {data});
  });
});
