import React, { Component } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { Button, Modal } from "react-bootstrap";
import "../styles/widgets.css";

class HumidityTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currHumid: "0",
      minHumid: "0",
      maxHumid: "0",
      avgHumid: "0"
    };
  }

  componentWillReceiveProps(next) {
    this.setState({
      currHumid: this.getCurr(next),
      maxHumid: this.getMax(next),
      minHumid: this.getMin(next),
      avgHumid: this.getAvg(next)
    });
  }

  getCurr = next => {
    if (next.list && next.list.length !== 0) {
      const valList = next.list[next.list.length - 1];
      let curr = valList.humidity;
      return curr;
    }    
  }
  getMax = next => {
    if (next.list && next.list.length !== 0) {
      const valList = next.list;
      var humidList = valList.map(x => x.humidity);
      return Math.max(...humidList); 
    }
  }
  getMin = next => {
    if (next.list && next.list.length !== 0) {
      const valList = next.list;
      var humidList = valList.map(x => x.humidity);
      return Math.min(...humidList);
    }
  }
  getAvg = next => {
    if (next.list && next.list.length !== 0) {
      const valList = next.list;
      var humidList = valList.map(x => x.humidity);
      var sum = humidList.reduce((a, b) => a + b, 0);
      var avg = Math.round( sum / (valList.length-1));
      return avg;
    }
  }
  msToTime(duration) {
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

      firstDate = this.msToTime(new Date(first.timeStamp).getTime());
      secondDate = this.msToTime(new Date(second.timeStamp).getTime());
      thirdDate = this.msToTime(new Date(third.timeStamp).getTime());
      fourthDate = this.msToTime(new Date(fourth.timeStamp).getTime());
    }

    return (
      <div className="tableStyle">
        <div>
          <h1>Humidity</h1>
          <p>Current Humidity: {this.state.currHumid}</p>
          <p>Minimum Humidity: {this.state.minHumid}</p>
          <p>Maximum Humidity: {this.state.maxHumid}</p>
          <p>Average Humidity: {this.state.avgHumid}</p>

          <VictoryChart // adding the material theme provided with Victory
            theme={VictoryTheme.material}
            domainPadding={20}
          >
            <VictoryAxis
              tickCount={3}
              tickValues={[1, 20, 30, 50]}
              tickFormat={[firstDate, secondDate, thirdDate, fourthDate]}
            />
            <VictoryAxis dependentAxis tickFormat={x => `${x}%`} />
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" }
              }}
              data={this.props.list}
              x="timeStamp"
              y="humidity"
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

export default HumidityTab;
