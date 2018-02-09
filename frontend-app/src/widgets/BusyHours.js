import React, { Component } from "react";
import "../styles/widgets.css";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { Button, Modal } from "react-bootstrap";
const moment = require("moment");

class HoursTab extends Component {
  constructor(props) {
    super(props);
  }

  // componentWillReceiveProps(next) {
  //   const map = new Map();
  //   next.list.forEach(element => {
  //     const hour =  moment(element.timeStamp).local().get('hour');
  //     const minute = moment(element.timeStamp).local().get('minute');
  //     console.log(hour+':'+minute);
  //     this.setState({
  //       mostBusyHour:hour+':'+minute,
  //       leastBusyHour:0
  //     });
  //     map.set(hour, map.get(hour) ? map.get(hour) + 1 : 1);
  //   });
  //   map.forEach((key, val) => {
  //   });
  // }

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
          <h1>Busy Hours</h1>
          <br />
          <br />
          <br />
          <br />
          <br />
          <VictoryChart // adding the material theme provided with Victory
            theme={VictoryTheme.material}
            domainPadding={20}
          >
            <VictoryAxis
              tickCount={3}
              tickValues={[25, 50, 75, 100]}
              tickFormat={[firstDate, secondDate, thirdDate, fourthDate]}
            />
            <VictoryAxis
              dependentAxis
              tickValues={[0, 1]}
              tickFormat={["False", "True"]}
            />
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" }
              }}
              data={this.props.list}
              x="timeStamp"
              y="movementSensed"
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
            <Modal.Title>All values for the movement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.dataList.map(arr => {
              return (
                <div key={arr.timeStamp}>
                  <dt>Movement sensed?: {arr.movementSensed ? "Yes" : "No"}</dt>
                  <dd>Time: {moment(arr.timeStamp).format("LTS")}</dd>
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

export default HoursTab;
