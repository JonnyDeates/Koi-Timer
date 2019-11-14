import React from 'react';
import './App.css';
import Header from "./Header/Header";
import Pomodoro from "./Pomodoro/Pomodoro";
import {Context} from "./Context/Context"
import Info from "./Info/Info";
import Footer from "./Footer/Footer";
import sound from './assets/analog_alarm_clock.wav'
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoopOn: false,
            timerArray: [1,1,1,1,1,1,11,1,1]
        };
        this.toggleLoop = () => {
            this.setState({isLoopOn: !this.state.isLoopOn})
        };
        this.setTimerArray = (arr) => {
            this.setState({timerArray: arr})
        };
    }
    render() {
        const value = {
            isLoopOn: this.state.isLoopOn,
            toggleLoop: this.toggleLoop,
            audioToPlay: sound,
            pomodoro: 25*60,
            shortBreak: 5*60,
            longBreak: 15*60,
            timerArray: this.state.timerArray,
            setTimerArray: this.setTimerArray
        };
        return (
            <div className="App">
                <Context.Provider value={value}>
                    <Header/>
                    <Pomodoro/>
                    <Info/>
                    <Footer/>
                </Context.Provider>
            </div>
        );
    }
}


export default App;
