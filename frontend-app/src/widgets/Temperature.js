import React, { Component } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { Button, Modal } from "react-bootstrap";
import "../styles/widgets.css";
const moment = require("moment");

class TemperatureTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currTemp: 0,
      maxTemp: 0,
      minTemp: 0,
      avgTemp: 0
    };
  }

  componentWillReceiveProps(next) {
    this.setState({
      currTemp: this.getCurr(next),
      maxTemp: this.getMax(next),
      minTemp: this.getMin(next),
      avgTemp: this.getAvg(next)
    });
  }

  getCurr = next => {
    if (next.list && next.list.length !== 0) {
      const valList = next.list[0];
      let curr = valList.temperature;
      return curr;
    }
  };
  getMax = next => {
    if (next.list && next.list.length !== 0) {
      const valList = next.list;
      const tempList = valList.map(x => x.temperature);
      return Math.max(...tempList);
    }
  };
  getMin = next => {
    if (next.list && next.list.length !== 0) {
      const valList = next.list;
      const tempList = valList.map(x => x.temperature);
      return Math.min(...tempList);
    }
  };
  getAvg = next => {
    if (next.list && next.list.length !== 0) {
      const valList = next.list;
      const tempList = valList.map(x => x.temperature);
      var sum = tempList.reduce((a, b) => a + b, 0);
      var avg = Math.round(sum / (valList.length - 1));
      return avg;
    }
  };

  render() {
    let firstDate = "";
    let secondDate = "";
    let thirdDate = "";
    let fourthDate = "";

    if (this.props.list && this.props.list.length !== 0) {
      const first = this.props.list[24];
      const second = this.props.list[49];
      const third = this.props.list[74];
      const fourth = this.props.list[this.props.list.length - 1];

      firstDate = moment(first.timeStamp).format('LTS');
      secondDate = moment(second.timeStamp).format('LTS');
      thirdDate = moment(third.timeStamp).format('LTS');
      fourthDate = moment(fourth.timeStamp).format('LTS');
    }

    return (
      <div className="tableStyle">
        <div>
          <h1>Temperature</h1>
          <p>Current Temperature: {this.state.currTemp}F</p>
          <p>Minimum Temperature: {this.state.minTemp}F</p>
          <p>Maximum Temperature: {this.state.maxTemp}F</p>
          <p>Average Temperature: {this.state.avgTemp}F</p>
          <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
            <VictoryAxis
              tickCount={3}
              tickValues={[25, 50, 75, 100]}
              tickFormat={[firstDate, secondDate, thirdDate, fourthDate]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={x => `${x}F`}
              domain={[90, 50]}
            />
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
          <ShowAll dataList={this.props.list} />
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
            <Modal.Title>All values for Temperature</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {this.props.dataList.map(arr => {
            return (
              <div key={arr.timeStamp}>
                <dt>Temperature: {arr.temperature}F</dt>
                <dd>Time: {moment(arr.timeStamp).format('LTS')}</dd>
                <hr />
              </div>
            );
          })}
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
