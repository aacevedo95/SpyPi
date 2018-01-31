import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import "../styles/widgets.css";

class LightswitchTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightOn : false
    };
  }
  render() {
    return (
      <div className="tableStyle">
        <div>
          <h1>Light Switch</h1>
          <h2>On</h2>
          <h2>Off</h2>
        </div>
      </div>
    );
  }
}

export default LightswitchTab;
