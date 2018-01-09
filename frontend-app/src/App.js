import React, {Component} from 'react';
import TemperatureTab from './widgets/Temperature';
import HumidityTab from './widgets/Humidity'
import HoursTab from './widgets/BusyHours';
import './styles/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Grid, Row, Col} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SpyPi Dashboard</h1>
        </header>
        <div className='container'>
          <TemperatureTab/>
          <HumidityTab/>
          <HoursTab/>
        </div>
      </div>
    );
  }
}

export default App;
