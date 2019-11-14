import React from 'react';
import "./Timer.css";
import {TitleComponent} from "../Title/Title";

class ArrayTimer extends React.Component {
    state = {
        time: this.props.time,
        count: this.props.time[0],
        currentTimer: 1,
        isOn: false,
        Interval: null
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.time !== prevProps.time) {
            if (this.state.Interval) {
                this.componentWillUnmount();
            }
            this.setState({time: this.props.time, count: this.props.time[prevState.currentTimer - 1], isOn: false});
        }
    }

    componentDidMount() {
        if (this.state.isOn) {
            this.setState({
                Interval: setInterval(() => {
                    this.setState(prevState => ({
                        count: prevState.count - 1
                    }));
                    if (this.state.time.length !== this.state.currentTimer && this.state.count <= 0) {
                        this.setState({
                            currentTimer: this.state.currentTimer + 1,
                            count: this.state.time[this.state.currentTimer]
                        });
                    } else if (this.state.count <= 0) {
                        clearInterval(this.state.Interval);
                    }
                }, 1000)
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.Interval);
        this.setState({isOn: false});
    }

    zeroPadding(num) {
        if (num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    getMinutes(count) {
        if (count >= 60) {
            return this.zeroPadding(Math.floor((count / 60))) + ':'
        }else {
            return ''
        }
    }

    getHours(count) {
        if (count >= 3600) {
            return this.zeroPadding(Math.floor((count / 3600))) + ':'
        } else {
            return ''
        }
    }

    stopInterval() {
        clearInterval(this.state.Interval);
        this.setState({isOn: false});
    }

    startInterval() {
        this.state.isOn = true;
        this.setState({isOn: true});
        this.componentDidMount();
    }

    restartTimer() {
        clearInterval(this.state.Interval);
        this.setState({count: this.state.time[0], isOn: false, currentTimer: 1});
    }

    skipTimer() {
        if (this.state.currentTimer + 1 <= this.state.time.length) {
            this.setState({
                count: this.state.time[this.state.currentTimer],
                isOn: false,
                currentTimer: this.state.currentTimer + 1
            });
        } else {
            this.setState({count: this.state.time[0], isOn: false, currentTimer: 0})
        }

    }

    render() {
        const {count} = this.state;
        const title = this.getHours(count) + this.getMinutes(count) + this.zeroPadding(count % 60);
        return (
            <div className="timer">
                <h1>{title}</h1>
                <TitleComponent title={title + ' Koi Timer'}/>
                <div className='timer-buttons'>
                    {(this.state.isOn) ? <button onClick={() => this.stopInterval()}> Pause </button> :
                        <button onClick={() => this.startInterval()}> Start </button>}
                    <button onClick={() => this.skipTimer()}>Skip</button>
                    <button onClick={() => this.restartTimer()}> Restart</button>
                </div>
            </div>
        );
    }
}


export default ArrayTimer;
