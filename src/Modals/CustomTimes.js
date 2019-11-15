import React from 'react';
import './Modals.css'
import {Context} from "../Context/Context";

class CustomTimes extends React.Component {
    static contextType = Context;
    state = {
        active: this.props.active,
        timeScaleMinutes: true,
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15
    };

    handlePomodoro(e) {
        this.setState({pomodoro: e.target.value});
        this.context.setPomodoro(this.convertTime(e.target.value));
    }

    handleShortBreak(e) {
        this.setState({shortBreak: e.target.value});
        this.context.setShortBreak(this.convertTime(e.target.value));
    }

    handleLongBreak(e) {
        this.setState({longBreak: e.target.value});
        this.context.setLongBreak(this.convertTime(e.target.value));
    }

    handleTimeScale() {
        this.setState({timeScaleMinutes: !this.state.timeScaleMinutes});
    }

    convertTime(num) {
        if (this.state.timeScaleMinutes) {
            return parseFloat(Math.round(num * 60).toFixed(1));
        } else {
            return parseInt(num);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.active !== prevProps.active) {
            this.setState({active: this.props.active});
        }
        if (this.state.timeScaleMinutes !== prevState.timeScaleMinutes) {
            if (this.state.timeScaleMinutes) {
                this.setState({
                    pomodoro: this.state.pomodoro / 60,
                    shortBreak: this.state.shortBreak / 60,
                    longBreak: this.state.longBreak / 60
                })
            } else {
                this.setState({pomodoro: this.state.pomodoro * 60,
                    shortBreak: this.state.shortBreak * 60,
                    longBreak: this.state.longBreak * 60})
            }
        }
    }

    render() {
        return (
            <div className={(!this.state.active) ? 'active' : 'modalWrapper'}>
                <div className={(!this.state.active) ? 'active' : 'modalWrapper'} onClick={this.props.setCustomTimes}/>
                <div className="customtimes">
                    <h1>Custom Times</h1>
                    <div className="customtimes-form">
                        <h2>Set Timers</h2>
                        <div className="radio">
                            <label>
                                <input type="radio" value="minutes" onChange={() => this.handleTimeScale()}
                                       checked={this.state.timeScaleMinutes}/>
                                Minutes
                            </label>
                            <label>
                                <input type="radio" value="seconds" onChange={() => this.handleTimeScale()}
                                       checked={!this.state.timeScaleMinutes}/>
                                Seconds
                            </label>
                        </div>
                        <label>
                            Pomodoro:
                            <input type="number" value={this.state.pomodoro} onChange={(e) => this.handlePomodoro(e)}/>
                        </label>
                        <label>
                            Short Break:
                            <input type="number" value={this.state.shortBreak}
                                   onChange={(e) => this.handleShortBreak(e)}/>
                        </label>
                        <label>
                            Long Break:
                            <input type="number" value={this.state.longBreak}
                                   onChange={(e) => this.handleLongBreak(e)}/>
                        </label>
                    </div>
                </div>
            </div>
        );
    }

}


export default CustomTimes;

