import React from 'react';
import Timer from "../Timer/Timer";
import ArrayTimer from "../Timer/ArrayTimer";
import './Pomodoro.css'
import {Context} from "../Context/Context";
class Pomodoro extends React.Component {
    static contextType = Context;
    state = {
        count: 25*60,
        isOnLoop: false
    };
    setTimer(newTime){
        if(this.state.isOnLoop) {
            this.setState({count: newTime, isOnLoop: false})
        } else {
            this.setState({count: newTime})
        }
        console.log(this.context)
    }
    render(){
        return (
            <div className="body">
                <button onClick={()=>this.setTimer(this.context.pomodoro)}>Pomodoro</button>
                <button onClick={()=>this.setTimer(this.context.shortBreak)}>Short Break</button>
                <button onClick={()=>this.setTimer(this.context.longBreak)}>Long Break</button>
                <button className={(this.context.isLoopOn) ? 'tinted' : ''} onClick={this.context.toggleLoop}>Loop</button>
                {(this.context.isLoopOn) ? <ArrayTimer time={this.context.timerArray}/> : <Timer time={this.state.count}/>}
            </div>
        );
    }

}


export default Pomodoro;
