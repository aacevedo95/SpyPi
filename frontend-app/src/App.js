import React, {Component} from 'react';
import TempHumidView from './widgets/Temperature';
import HoursView from './widgets/BusyHours';
import BusyHours from './widgets/BusyHours';
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
          <TempHumidView/>
          <BusyHours/>
        </div>
      </div>
    );
  }
}

export default App;
