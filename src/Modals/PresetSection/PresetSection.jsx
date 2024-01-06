import React from 'react';
import {round} from "../../Utlis/TimerUtils";

class PresetSection extends React.Component {

    state = {
        active: this.props.active,
        timeArray: this.props.timeArray,
        setTimerArray: this.props.setTimerArray,
        title: this.props.title,
        desc: this.props.desc,
    };
    convertArray(arr){
        return arr.map(num => (num*60))
    }
    sumArray(arr) {
        return arr.reduce((a,b)=> a+b) / 60;
    }

    setTimer(){
        this.state.setTimerArray(this.convertArray(this.state.timeArray));
        this.props.handleCurrentActive(this.props.index);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.active !== prevProps.active) {
            this.setState({active: this.props.active});
        }
        if(this.props.timeArray !== prevProps.timeArray){
            this.setState({timeArray: this.props.timeArray});
        }
        if (this.props.title !== prevProps.title) {
            this.setState({title: this.props.title});
        }
        if (this.props.desc !== prevProps.desc) {
            this.setState({desc: this.props.desc});
        }
    }
    render() {

        return (
            <div className={(this.state.active) ? 'tinted':''} onClick={() => this.setTimer()}>
                {(this.props.index > 2) ? <button onClick={()=> this.props.deletePreset(this.props.id)}>X</button> : ''}
                <h2>{this.state.title}</h2>
                <p>{this.state.desc}</p>
                <p>Time Length: {round(this.sumArray(this.state.timeArray),2)} hours</p>
                <p>Times: <span>{this.state.timeArray.map((num,i)=> (i!==this.state.timeArray.length-1)? (num+', ') : num)}</span></p>
            </div>
        );
    }

}


export default PresetSection;
