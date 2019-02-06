const R = require('ramda');
const SerialPort = require('serialport');
const DelimiterParser = require('@serialport/parser-delimiter');

// In the future this class may need to support
// sending messages to the controller
// bc vibrations and stuff
class SerialProducer {
  constructor() {
    // should we open the port here?
    this.port = undefined;
    this.parser = undefined;

    // Do this in the constructory so it's multicast
    SerialPort.list()
      // find the good port
      // we should maybe mess with the config on our arduinos for this
      .then(R.find(p => R.test(/Arduino/, p.manufacturer)))
      // to do error handling controller not being there
      .then(portInfo => {
        this.port = new SerialPort(portInfo.comName);
        this.parser = this.port.pipe(new DelimiterParser({ delimiter: '-' }));
      }) // Maybe make this newline
  }

  start(listener) {
    // I think there is an error in this file in opening too many ports
    // but maybe not. xstream only starts for the first listender
    // what a nice library
    if (this.parser) this.parser.on('data', d => listener.next(d));
    else listener.error(new Error('No Port Connected'));
  }

  stop() {
    // Implement stop
    console.log(this.parser);
  }
}

module.exports = SerialProducer;
