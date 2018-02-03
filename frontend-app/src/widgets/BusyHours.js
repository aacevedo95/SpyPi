import React, { Component } from "react";
import "../styles/widgets.css";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { Button, Modal } from "react-bootstrap";
const moment = require('moment');

class HoursTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostBusyHour: "00:00",
      leastBusyHour: "00:00"
    };
  }


  componentWillReceiveProps(next) {
    const map = new Map();
    next.list.forEach(element => {
      const hour =  moment(element.timeStamp).local().get('hour');
      map.set(hour, map.get(hour) ? map.get(hour) + 1 : 1);
    });
    map.forEach((key, val) => {

    });

    this.setState({
      mostBusyHour: this.getCurr(next),
      leastBusyHour: this.getMax(next)
    });

  }

  mostHour(hour){
    
  }

  leastHour(hour){

  }

  msToTime(duration) {
    var seconds = parseInt((duration / 1000) % 60, 10),
      minutes = parseInt((duration / (1000 * 60)) % 60, 10),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    this.calcBusyHour(hours);    
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
      
    console.log('Moment below')
    console.log(moment(fourth.timeStamp).get('hour'));
    console.log(moment(fourth.timeStamp).local().get('minute'));
    console.log(moment(fourth.timeStamp).local().get('second'));
    
    console.log('func below');
    console.log(this.msToTime(new Date(fourth.timeStamp).getTime()));
      

      firstDate = this.msToTime(new Date(first.timeStamp).getTime());
      secondDate = this.msToTime(new Date(second.timeStamp).getTime());
      thirdDate = this.msToTime(new Date(third.timeStamp).getTime());
      fourthDate = this.msToTime(new Date(fourth.timeStamp).getTime());
    }

    return (
      <div className="tableStyle">
        <div>
          <h1>Busy Hours</h1>
          <p>Busiest Hour: {this.state.curBusyHour}</p>
          <p>Least Busy Hour: {this.state.leastBusyHour}</p>

          <VictoryChart // adding the material theme provided with Victory
            theme={VictoryTheme.material}
            domainPadding={20}
          >
            <VictoryAxis
              tickCount={3}
              tickValues={[1, 20, 30, 50]}
              tickFormat={[firstDate, secondDate, thirdDate, fourthDate]}
            />
            <VictoryAxis dependentAxis tickFormat={['True']} />
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

export default HoursTab;
