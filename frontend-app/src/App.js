import React, {Component} from 'react';
import TempView from './widgets/Temperature';
import HumidityView from './widgets/Humidity';
import HoursView from './widgets/BusyHours';
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
          <TempView/>
          <HumidityView/>
          <HoursView/>
        </div>
      </div>
    );
  }
}

export default App;
