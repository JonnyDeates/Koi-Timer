import React from 'react';
import './Modals.css'
import {Context} from "../Context/Context";

class CustomTimes extends React.Component {
    static contextType = Context;
    state = {
        active: this.props.active
    };
    componentDidUpdate(prevProps) {
        if (this.props.active !== prevProps.active) {
            this.setState({active: this.props.active});
        }
    }
    render() {
        return (
            <div className={(!this.state.active) ? 'active' : 'modalWrapper'} onClick={this.props.setCustomTimes}>
                <div className="presets" >
                    <h1>Custom Times</h1>
                    <div onClick={()=> this.context.setTimerArray([25,5,25,5,25,5,25,20,25,5,25,5,25,5,25,20,25])}>
                        <h2>The Standard</h2>
                        <p>The standard model of the pomodoro drone.</p>
                        <p>Time Length: 4.5 hours</p>
                        <p>Times: <span>[25,5,25,5,25,5,25,20,25,5,25,5,25,5,25,20,25]</span></p>
                    </div>
                </div>
            </div>
        );
    }

}


export default CustomTimes;

