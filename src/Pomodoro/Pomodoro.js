import React from 'react';
import Timer from "../Timer/Timer";
import ArrayTimer from "../Timer/ArrayTimer";
import './Pomodoro.css'
import {Context} from "../Context/Context";
class Pomodoro extends React.Component {
    static contextType = Context;
    state = {
        pomodoro: 25*60,
        shortBreak: 5*60,
        longBreak: 15*60,
        count: 25*60,
        isOnLoop: false
    };
    setTimer(newTime){
        if(this.state.isOnLoop) {
            this.setState({count: newTime, isOnLoop: false})
        } else {
            this.setState({count: newTime})
        }

    }

    secToMins(num) {
        return num * 60;
    }
    render(){
        return (
            <div className="body">
                <button onClick={()=>this.setTimer(this.state.pomodoro)}>Pomodoro</button>
                <button onClick={()=>this.setTimer(this.state.shortBreak)}>Short Break</button>
                <button onClick={()=>this.setTimer(this.state.longBreak)}>Long Break</button>
                <button className={(this.context.isLoopOn) ? 'tinted' : ''} onClick={this.context.toggleLoop}>Loop</button>
                {(this.context.isLoopOn) ? <ArrayTimer time={[25*60,5*60,25*60,5*60,25*60,5*60,25*60,15*60]}/> : <Timer time={this.state.count}/>}
            </div>
        );
    }

}


export default Pomodoro;
