import React from 'react';
import './Modals.css'
import {Context} from "../Context/Context";
import PresetSection from "./PresetSection/PresetSection";

class Presets extends React.Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.handleCurrentActive = this.handleCurrentActive.bind(this);
    }

    state = {
        active: this.props.active,
        currentActive: 0
    };

    componentDidUpdate(prevProps) {
        if (this.props.active !== prevProps.active) {
            this.setState({active: this.props.active});
        }
    }

    handleCurrentActive(i){
        console.log(i, this.state.currentActive)
        this.setState({currentActive: i})
    }
    render() {
        const data = [{
            title: 'The Standard',
            desc: 'The standard model of the pomodoro drone.',
            timeArray: [25, 5, 25, 5, 25, 5, 25, 15, 25, 5, 25, 5, 25, 5, 25, 15, 10]
        },
            {
                title: 'The Koi Timer',
                desc: 'My idea of a good work ethic.',
                timeArray: [25, 5, 25, 5, 25, 5, 25, 20, 30, 5, 25, 5, 25, 5, 25, 20, 25]
            },
            {
                title: 'The Revised Standard',
                desc: 'A revised model of the pomodoro drone, shorter in case to fit some people\'s time constraints.',
                timeArray: [20, 5, 20, 5, 20, 5, 20, 15, 20, 5, 20, 5, 20, 5, 20, 15, 20]
            }]
        return (
            <div className={(!this.state.active) ? 'active' : 'modalWrapper'}>
                <div className={(!this.state.active) ? 'active' : 'modalWrapper'} onClick={this.props.setPresets}/>
                <div className="presets">
                    <button onClick={this.props.setPresets}>X</button>
                    <h1> Presets </h1>
                    {data.map((obj, i) => <PresetSection key={i} title={obj.title} desc={obj.desc}
                                                         setTimerArray={this.context.setTimerArray}
                                                         timeArray={obj.timeArray} index={i}
                                                         handleCurrentActive={this.handleCurrentActive}
                                                         active={(this.state.currentActive === i)}/>)}
                </div>
            </div>
        );
    }

}


export default Presets;

