import React, {Component} from 'react';
import './Modals.css'
import {Context} from "../Context/Context";
import PresetSection from "./PresetSection/PresetSection";

class Presets extends Component {
    static contextType = Context;
    state = {
        active: this.props.active,
    };

    componentDidUpdate(prevProps) {
        if (this.props.active !== prevProps.active) {
            this.setState({active: this.props.active});
        }
    }
    render() {
        return (
            <div className={(!this.state.active) ? 'active' : 'modalWrapper'}>
                <div className={(!this.state.active) ? 'active' : 'modalWrapper'} onClick={this.props.setPresets}/>
                <div className="presets">
                    <button onClick={this.props.setPresets}>X</button>
                    <h1> Presets </h1>
                    {this.context.presets.map((obj, i) => <PresetSection key={i} title={obj.title} desc={obj.desc}
                                                         setTimerArray={this.context.setTimerArray}
                                                         timeArray={obj.timeArray} index={i}
                                                         handleCurrentActive={this.context.handleCurrentActive}
                                                                         deletePreset={this.context.deletePreset}
                                                         active={(this.context.currentPresetActive === i)}/>)}
                </div>
            </div>
        );
    }

}


export default Presets;

