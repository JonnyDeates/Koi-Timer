import React from 'react';
import './Modals.css'
import {Context} from "../Context/Context";
import {round} from "../Utlis/TimerUtils";
import cuid from "cuid";

class CustomTimes extends React.Component {
    static contextType = Context;
    state = {
        active: this.props.active,
        timeScaleMinutes: true,
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
        customTimeArray: [25]
    };

    handlePomodoro(e) {
        this.setState({pomodoro: parseFloat(e.target.value)});
        this.context.setPomodoro(this.convertTime(e.target.value));
    }

    handleShortBreak(e) {
        this.setState({shortBreak: parseFloat(e.target.value)});
        this.context.setShortBreak(this.convertTime(e.target.value));
    }

    handleLongBreak(e) {
        this.setState({longBreak: parseFloat(e.target.value)});
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
                this.setState({
                    pomodoro: this.state.pomodoro * 60,
                    shortBreak: this.state.shortBreak * 60,
                    longBreak: this.state.longBreak * 60
                })
            }
        }
    }

    minuteCheck(timeSelected) {
        if (this.state.timeScaleMinutes) {
            return timeSelected;
        } else {
            return timeSelected / 60;
        }
    }

addPreset()
{
    if (this.state.customTimeArray.length >= 2) {
        this.context.addPreset({
            title: `Custom Preset ${this.context.presets.length - 2}`,
            desc: 'This is a client added preset.',
            timeArray: this.state.customTimeArray,
            id: cuid()
        })
    } else {
        alert('The time sequence is not large enough.')
    }
}
render()
{
    return (
        <div className={(!this.state.active) ? 'active' : 'modalWrapper'}>
            <div className={(!this.state.active) ? 'active' : 'modalWrapper'} onClick={this.props.setCustomTimes}/>
            <div className="customtimes">
                <button onClick={this.props.setCustomTimes}>X</button>
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
                <div className={'custom-preset'}>
                    <h2> Custom Preset</h2>
                    <div>
                        <button
                            onClick={() => this.setState({customTimeArray: [...this.state.customTimeArray, this.minuteCheck(this.state.pomodoro)]})}>Pomodoro
                        </button>
                        <button
                            onClick={() => this.setState({customTimeArray: [...this.state.customTimeArray, this.minuteCheck(this.state.shortBreak)]})}>Short
                            Break
                        </button>
                        <button
                            onClick={() => this.setState({customTimeArray: [...this.state.customTimeArray, this.minuteCheck(this.state.longBreak)]})}>Long
                            Break
                        </button>
                    </div>
                    <div>
                        <p>Length: <span>{round(this.state.customTimeArray.reduce((a, b) => {
                            return a + b;
                        }, 0) / 60, 2)} hours</span></p>
                        <p>Times: <span>{(this.state.customTimeArray.length !== 0) ? this.state.customTimeArray.map((num, i) => (i !== this.state.customTimeArray.length - 1) ? (round(num,2) + ', ') : round(num,2)) : 'N/A'}</span></p>
                    </div>
                    <div>
                        <button onClick={() => this.setState({customTimeArray: []})}>Clear</button>
                        <button onClick={() => this.addPreset()}>Submit</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

}


export default CustomTimes;

