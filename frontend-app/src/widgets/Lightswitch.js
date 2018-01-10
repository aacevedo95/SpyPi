import React, {Component} from 'react';
import '../styles/widgets.css';

class LightswitchTab extends Component {
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
                        <h1>Light Switch</h1>
                        <h2>On</h2>
                        <h2>Off</h2>
                    </div>
                </table>
            </div>
        );
    }
}

export default LightswitchTab;