import React from 'react';
import './Header.css'
import Presets from "../Modals/Presets";
import CustomTimes from "../Modals/CustomTimes";

class Header extends React.Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.setPresets = this.setPresets.bind(this);
        this.setCustomTimes = this.setCustomTimes.bind(this);
    }
    state = {
        customTimes: false,
        presets: false
    };

    setCustomTimes() {
        this.setState({customTimes: false})
    }
    setPresets() {
        this.setState({presets: false})
    }
    render() {
        return (
            <div className="header">
                <h1>Koi Timer</h1>
                <div className="nav">
                    <button onClick={() => this.setState({customTimes: true})}>Custom Timer</button>
                    <button onClick={() => this.setState({presets: true})}>Presets</button>
                </div>
                <Presets setPresets={this.setPresets} active={this.state.presets}/>
                <CustomTimes setCustomTimes={this.setCustomTimes} active={this.state.customTimes}/>
            </div>
        );
    }

}


export default Header;
