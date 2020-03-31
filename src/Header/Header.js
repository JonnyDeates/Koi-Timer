import React from 'react';
import './Header.css'
import Presets from "../Modals/Presets";
import CustomTimes from "../Modals/CustomTimes";
import Sounds from "../Modals/Sounds";
import {Context} from "../Context/Context";
import logo from '../Assets/logos/yinyangyexin.png'
class Header extends React.Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.setPresets = this.setPresets.bind(this);
        this.setCustomTimes = this.setCustomTimes.bind(this);
        this.setSounds = this.setSounds.bind(this);
    }
    state = {
        customTimes: false,
        presets: false,
        sounds: false
    };

    setCustomTimes() {
        this.setState({customTimes: false})
    }
    setPresets() {
        this.setState({presets: false})
    }
    setSounds() {
        this.setState({sounds: false})
    }
    render() {
        return (
            <div className="header">
                <h1>K<img src={logo} alt={'o'}/>i Timer</h1>
                <div className="nav">
                    <button onClick={() => this.setState({customTimes: true})}>Custom Timer</button>
                    <button onClick={() => this.setState({presets: true})}>Presets</button>
                    <button onClick={() => this.setState({sounds: true})}>Alarm</button>
                </div>
                <Presets setPresets={this.setPresets} active={this.state.presets} presets={this.context.presets} setTimerArray={this.context.setTimerArray}
                         handleCurrentActive={this.context.handleCurrentActive} deletePreset={this.context.deletePreset}
                         currentPresetActive={(this.context.currentPresetActive)}/>
                <CustomTimes setCustomTimes={this.setCustomTimes} active={this.state.customTimes}/>
                <Sounds setSounds={this.setSounds} active={this.state.sounds} volume={this.context.volume}/>
            </div>
        );
    }

}


export default Header;

