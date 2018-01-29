import React, { Component } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { Button, Modal } from "react-bootstrap";
import "../styles/widgets.css";

class TemperatureTab extends Component {
  constructor(props) {
    super(props);
    this._msToTime.bind(this);
    this._getTemp.bind(this);
    this.state = {
      currTemp: this._getTemp(),
      maxTemp: this._getTemp(),
      minTemp: this._getTemp(),
      avgTemp: this._getTemp()
    };
  }

  // componentDidMount() {
  //     this.setState({
  //     currTemp:  this.props.list[0].temperature,
  //     maxTemp : this.props.list[1].temperature,
  //     minTemp: this.props.list[2].temperature,
  //     avgTemp: this.props.list[3].temperature
  //     });
  // }

  _getTemp() {
    const propVar = this.props.list;
    if (this.props.list && this.props.list.length !== 0) {
      this.setState({
        currTemp: propVar[50].temperature
      });
      console.log("Inside if in _getTemp()");
    }
    console.log("Inside _getTemp()");
  }

  _msToTime(duration) {
    var seconds = parseInt((duration / 1000) % 60, 10),
      minutes = parseInt((duration / (1000 * 60)) % 60, 10),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  render() {
    let firstDate = "";
    let secondDate = "";
    let thirdDate = "";
    let fourthDate = "";

    if (this.props.list && this.props.list.length !== 0) {
      const first = this.props.list[0];
      const second = this.props.list[19];
      const third = this.props.list[29];
      const fourth = this.props.list[this.props.list.length - 1];

      firstDate = this._msToTime(new Date(first.timeStamp).getTime());
      secondDate = this._msToTime(new Date(second.timeStamp).getTime());
      thirdDate = this._msToTime(new Date(third.timeStamp).getTime());
      fourthDate = this._msToTime(new Date(fourth.timeStamp).getTime());
    }

    return (
      <div className="tableStyle">
        <div>
          <h1>Temperature View</h1>
          <p>Current Temperature: {this.state.currTemp}</p>
          <p>Minimum Temperature: this.state.minTemp}</p>
          <p>Maximum Temperature: this.state.maxTemp}</p>
          <p>Average Temperature: this.state.avgTemp}</p>
          <VictoryChart // adding the material theme provided with Victory
            theme={VictoryTheme.material}
            domainPadding={20}
          >
            <VictoryAxis
              tickCount={3}
              tickValues={[1, 20, 30, 50]}
              tickFormat={[firstDate, secondDate, thirdDate, fourthDate]}
            />
            <VictoryAxis dependentAxis tickFormat={x => `${x}F`} />
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" }
              }}
              data={this.props.list}
              x="timeStamp"
              y="temperature"
            />
          </VictoryChart>
          <ShowAll />
        </div>
      </div>
    );
  }
}

class ShowAll extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.state = {
      showModal: false
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          See all
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>The x is:</h4>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p> test</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default TemperatureTab;
