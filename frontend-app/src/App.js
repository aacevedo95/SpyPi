import React, { Component } from "react";
import axios from "axios";
// Importing the Sensor widgets
import TemperatureTab from "./widgets/Temperature";
import HumidityTab from "./widgets/Humidity";
import HoursTab from "./widgets/BusyHours";
import CameraTab from "./widgets/Camera";
// Importing CSS
import "./styles/App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    list: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/data")
      //.get("http://192.168.1.7:4000/data")
      .then(e => {
        console.log(e);
        this.setState({ list: e.data });
      })
      .catch(err => console.log(err));

    axios
      .get("http://localhost:4000/images")
      //.get("http://192.168.1.7:4000/data")
      .then(e => {
        console.log(e);
        this.setState({ imageLists: e.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SpyPi Dashboard</h1>
        </header>
        <div className="container">
          <TemperatureTab list={this.state.list} />
          <HumidityTab list={this.state.list} />
          <HoursTab list={this.state.list} />
          <CameraTab imageList={this.state.imageLists}/>
        </div>
      </div>
    );
  }
}

export default App;
