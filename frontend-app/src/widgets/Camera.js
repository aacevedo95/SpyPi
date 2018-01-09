import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';
import '../styles/widgets.css';


class CameraTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currTemp: '0',
            maxTemp: '100',
            minTemp: '-100',
            avgTemp: '50'
        };
    }
    render() {
        return (
            <div className="tableStyle">
                <table>
                    <div>
                        <h1>Movement Camera</h1>
                        <center><h1>Imagine really hard this is an image.</h1></center>
                    </div>
                    <ShowAll />
                </table>
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
        this.setState({showModal: false});
    };

    open() {
        this.setState({showModal: true});
    };

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
                        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                    
                        <hr/>

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


export default CameraTab;