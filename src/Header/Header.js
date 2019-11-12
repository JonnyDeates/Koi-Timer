import React from 'react';
import './Header.css'
class Header extends React.Component {

    state = {
        customTimes: false,
        presets: false
    };
    openModal(modal){

    }

    secToMins(num) {
        return num * 60;
    }
    render(){
        return (
            <div className="header">
                <h1>Koi Timer</h1>
                <div className="nav">
                <button onClick={()=> this.setState({customTimer: true})}>Custom Timer</button>
                <button onClick={()=> this.setState({presets: true})}>Presets</button>
                </div>
            </div>
        );
    }

}


export default Header;

