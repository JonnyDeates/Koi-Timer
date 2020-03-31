import React, {Component} from 'react';
import './Modals.css'
import PresetSection from "./PresetSection/PresetSection";

class Presets extends Component {

    state = {
        active: this.props.active,
        presets: []
    };

    componentDidMount() {
        this.setState({presets: this.props.presets})
    }

    componentDidUpdate(prevProps) {
        if (this.props.active !== prevProps.active) {
            this.setState({active: this.props.active});
        }
        if(this.props.presets !== prevProps.presets){
            this.setState({presets: this.props.presets})
        }
    }
    render() {
        return (
            <div className={(!this.state.active) ? 'active' : 'modalWrapper'}>
                <div className={(!this.state.active) ? 'active' : 'modalWrapper'} onClick={this.props.setPresets}/>
                <div className="presets">
                    <button onClick={this.props.setPresets}>X</button>
                    <h1> Presets </h1>
                    {this.state.presets.map((obj, i) => <PresetSection key={i} title={obj.title} desc={obj.desc}
                                                         timeArray={obj.timeArray} index={i} id={obj.id} setTimerArray={this.props.setTimerArray}
                                                         handleCurrentActive={this.props.handleCurrentActive} deletePreset={this.props.deletePreset}
                                                         active={(this.props.currentPresetActive === i)}/>)}
                </div>
            </div>
        );
    }

}


export default Presets;

