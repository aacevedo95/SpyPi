const Buffer = require('buffer')
const SerialPort = require('serialport');
const axios = require('axios');
const sp = new SerialPort("COM3", {
  baudRate: 9600
});

let buf = new Buffer.Buffer('', 'utf8')

sp.on("open", () => {
  console.log('arduino detected');
  sp.on('data', (data) => {
    buf = Buffer.Buffer.concat([buf, data]);
    const str = buf.toString()
    const idx = str.indexOf('\n')
    if (idx !== -1) {
      const d = str.substr(0, idx).trim()
      console.log(d)
      buf = buf.subarray(idx + 1, buf.length)
      axios.post('http://localhost:4000/data', {
        data: d
      }).catch(err => (console.log(err)));
    } else {
      console.log('waiting for next piece of data')
    }
  });
});