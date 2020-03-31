import React from 'react';
import "./Timer.css";
import {TitleComponent} from "../Title/Title";
import {getTime} from "../Utlis/TimerUtils";
import {Context} from "../Context/Context";
class Timer extends React.Component {
    static contextType = Context;
    state = {
        time: this.props.time,
        count: this.props.time,
        isOn: false,
        Interval: null,
        isPlaying: null
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
                        this.setState({ isPlaying: this.context.audioToPlay },function(){
                            this.refs.audio.volume = this.context.volume;
                            this.refs.audio.pause();
                            this.refs.audio.load();
                            this.refs.audio.play();
                        });
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

    stopInterval() {
        clearInterval(this.state.Interval);
        if(this.state.count <= 0) {
            this.setState({count: this.state.time, isPlaying: this.context.audioToPlay },function(){
                this.refs.audio.pause();
            })
        }
        this.setState({isOn: false});
    }

    startInterval() {
        this.setState({isOn: true}, () => this.componentDidMount());
    }

    restartTimer() {
        clearInterval(this.state.Interval);
        this.setState({count: this.state.time, isOn: false});
        if(this.state.count <= 0) {
            this.setState({isPlaying: this.context.audioToPlay },function(){
                this.refs.audio.pause();
            })
        }
    }

    render() {
        const {count} = this.state;
        const title = getTime(count);
        return (
            <div className="timer">
                <TitleComponent title={title + ' Koi Timer'}/>
                <h1>{title}</h1>
                <audio ref="audio">
                    <source src={this.state.isPlaying} />
                </audio>
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
