import React, {Component} from 'react';
// Importing the Sensor widgets
import TemperatureTab from './widgets/Temperature';
import HumidityTab from './widgets/Humidity';
import HoursTab from './widgets/BusyHours';
import CameraTab from './widgets/Camera';
import LightswitchTab from './widgets/Lightswitch';
// Importing CSS
import './styles/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
          <CameraTab/>
          <LightswitchTab/>
        </div>
      </div>
    );
  }
}

export default App;
