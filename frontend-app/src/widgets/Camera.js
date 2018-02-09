import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import "../styles/widgets.css";
import config from "../config.json";
 

class CameraTab extends Component {


  render() {
    return (
      <div className="tableStyle">
        <div>
          <h1>Movement Camera</h1>
          <center>
            <h1>Click on the button below to see the images.</h1>
          </center>
        </div>
        <ShowAll imageList={this.props.imageList}/>
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
            <Modal.Title>Images</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
               this.props.imageList.map(i => (
                 <img src={`${config['backend_url']}/image/${i}`} alt="" />
               ))
            }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CameraTab;
