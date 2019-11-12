import React from 'react';
import "./Timer.css";
class Timer extends React.Component {
    state = {
        time: this.props.time,
        count: this.props.time,
        isOn: false,
        Interval: null
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.time !== prevProps.time) {
            if (this.state.Interval) {
                this.componentWillUnmount();
            }
            this.setState({time: this.props.time, count: this.props.time, isOn: false});
        }
    }

    componentDidMount() {
        if (this.state.isOn) {
            this.setState({
                Interval: setInterval(() => {
                    this.setState(prevState => ({
                        count: prevState.count - 1
                    }));
                    if (this.state.count <= 0) {
                        clearInterval(this.state.Interval)
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
        }
    }

    getHours(count) {
        if (count >= 3600) {
            return this.zeroPadding(Math.floor((count / 3600))) + ':'
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
        this.setState({count: this.state.time});
        this.setState({isOn: false});
    }

    render() {
        const {count} = this.state;
        return (
            <div className="timer">
                <h1>{this.getHours(count)}{this.getMinutes(count)}{this.zeroPadding(count % 60)}</h1>
                <div className="timer-buttons">
                    {(this.state.isOn) ? <button onClick={() => this.stopInterval()}> Pause </button> :
                        <button onClick={() => this.startInterval()}> Start </button>}
                    <button onClick={() => this.restartTimer()}> Restart</button>
                </div>
            </div>
        );
    }
}


export default Timer;
