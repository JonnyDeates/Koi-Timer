import React from 'react';

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
        let x = 0;
        for(let num of arr) {
            x = x+num;
        }
        return x/60;
    }
    render() {

        return (
            <div className={(this.state.active) ? '':''} onClick={() => this.state.setTimerArray(this.convertArray(this.state.timeArray))}>
                <h2>{this.state.title}</h2>
                <p>{this.state.desc}</p>
                <p>Time Length: {this.sumArray(this.state.timeArray)} hours</p>
                <p>Times: <span>{this.state.timeArray.map((num,i)=> (i!==this.state.timeArray.length-1)? (num+',') : num)}</span></p>
            </div>
        );
    }

}


export default PresetSection;