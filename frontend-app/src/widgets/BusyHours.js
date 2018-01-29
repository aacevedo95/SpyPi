import React, { Component } from "react";
import "../styles/widgets.css";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { Button, Modal } from "react-bootstrap";

const data = [
  {
    hour: 1,
    temp: 78
  },
  {
    hour: 2,
    temp: 80
  },
  {
    hour: 3,
    temp: 76
  },
  {
    hour: 4,
    temp: 82
  }
];

class HoursTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curBusyHour: "0",
      avgBusyHour: "100",
      mostBusyHour: "-100",
      leastBusyHour: "50"
    };
  }
  render() {
    return (
      <div className="tableStyle">
        <div>
          <h1>Busy Hours</h1>
          <p>Busiest Hour: {this.state.curBusyHour}</p>
          <p>Average Busy Hour: {this.state.avgBusyHour}</p>
          <p>Most Busy Hour: {this.state.mostBusyHour}</p>
          <p>Least Busy Hour: {this.state.leastBusyHour}</p>
        </div>
        <VictoryChart // adding the material theme provided with Victory
          theme={VictoryTheme.material}
          domainPadding={20}
        >
          <VictoryAxis
            tickValues={[1, 2, 3, 4]}
            tickFormat={["1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM"]}
          />
          <VictoryAxis dependentAxis tickFormat={x => `${x}F`} />
          <VictoryLine data={data} x="hour" y="temp" />
        </VictoryChart>
        <ShowAll2 />
      </div>
    );
  }
}

class ShowAll2 extends Component {
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

export default HoursTab;
