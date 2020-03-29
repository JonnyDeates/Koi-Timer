import React from 'react';
import "./Timer.css";
import {TitleComponent} from "../Title/Title";
import {getTime} from "../Utlis/TimerUtils";
import {Context} from "../Context/Context";

class ArrayTimer extends React.Component {
    static contextType = Context;
    state = {
        time: this.props.time,
        count: this.props.time[0],
        currentTimer: 1,
        isOn: false,
        Interval: null,
        isPlaying: null
    };

    componentDidUpdate(prevProps, prevState) {
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
                            count: this.state.time[this.state.currentTimer],
                            isPlaying: this.context.audioToPlay
                        }, function () {
                            this.refs.audio.pause();
                            this.refs.audio.load();
                            this.refs.audio.play();
                        });
                    } else if (this.state.count <= 0) {
                        this.setState({isPlaying: this.context.audioToPlay}, function () {
                            this.refs.audio.pause();
                            this.refs.audio.load();
                            this.refs.audio.play();
                        });
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


    stopInterval() {
        clearInterval(this.state.Interval);
        this.setState({isOn: false, isPlaying: this.context.audioToPlay}, function () {
            this.refs.audio.pause();
        });
    }

    startInterval() {
        this.state.isOn = true;
        this.setState({isOn: true});
        this.componentDidMount();
    }

    restartTimer() {
        clearInterval(this.state.Interval);
        this.setState({
            count: this.state.time[0],
            isOn: false,
            currentTimer: 1,
            isPlaying: this.context.audioToPlay
        }, function () {
            this.refs.audio.pause();
        });
    }

    skipTimer() {
        clearInterval(this.state.Interval);
        if (this.state.currentTimer + 1 <= this.state.time.length) {
            this.setState({
                count: this.state.time[this.state.currentTimer],
                isOn: false,
                currentTimer: this.state.currentTimer + 1
            });
        } else {
            this.setState({count: this.state.time[0], isOn: false, currentTimer: 1})
        }
    }

    backTimer() {
        clearInterval(this.state.Interval);
        if (this.state.currentTimer - 1 >= 1) {
            this.setState({
                count: this.state.time[this.state.currentTimer - 2],
                isOn: false,
                currentTimer: this.state.currentTimer - 1
            });
        } else {
            this.setState({
                count: this.state.time[this.state.time.length - 1],
                isOn: false,
                currentTimer: this.state.time.length
            })
        }
    }

    setTimer(i) {
        clearInterval(this.state.Interval);
        this.setState({
            count: this.state.time[i],
            isOn: false,
            currentTimer: i + 1
        });
    }

    render() {
        const {count} = this.state;
        const title = getTime(count);
        const sumTime = this.state.time.reduce((a, b) => {
            return a + b;
        }, 0);
        return (
            <div className="timer">
                <div className={'timer-elapsed'}>{this.state.time.map((x, i) =>
                    <div key={i}
                         className={((i) < this.state.currentTimer - 1) ? 'grey' : (i === this.state.currentTimer - 1) ? 'active' : ''}
                         style={{width: (x / sumTime) * 100 + '%'}}
                         onClick={()=>this.setTimer(i)}
                    />)}</div>
                {/*{this.state.currentTimer}</div>*/}
                <h1>{title}</h1>
                <TitleComponent title={title + ' Koi Timer'}/>
                <audio ref="audio">
                    <source src={this.state.isPlaying}/>
                </audio>
                <div className='timer-buttons'>
                    {(this.state.isOn) ? <button onClick={() => this.stopInterval()}> Pause </button> :
                        <button onClick={() => this.startInterval()}> Start </button>}
                    {/*<button onClick={() => this.backTimer()}>Back</button>*/}
                    <button onClick={() => this.backTimer()}>Back</button>
                    <button onClick={() => this.skipTimer()}>Skip</button>
                    <button onClick={() => this.restartTimer()}> Restart</button>
                </div>
            </div>
        );
    }
}


export default ArrayTimer;
