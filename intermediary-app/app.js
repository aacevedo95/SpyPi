const SerialPort = require('serialport');
const axios = require('axios');
const sp = new SerialPort("COM3", {
  baudRate: 250000
});

// serial port for Arduino comms
sp.on("open", () => {
  console.log('Communication is on!');

  // when your app receives data, this event is fired
  // so you can capture the data and do what you need
  sp.on('data', (data) => {
    axios.post('http://localhost:4000/data', {
      data: data.toString('utf8')
    }).then(e => {
      console.log(e)
    }).catch(err => (console.log(err)));
  });
  
});