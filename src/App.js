import React from 'react';
import './App.css';
import Header from "./Header/Header";
import Pomodoro from "./Pomodoro/Pomodoro";
import {Context} from "./Context/Context"
import Info from "./Info/Info";
import Footer from "./Footer/Footer";
import sound from './assets/analog_alarm_clock.wav'
import TodoList from "./TodoList/TodoList";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoopOn: false,
            showInfo: true,
            timerArray: [25*60, 5*60, 25*60, 5*60, 25*60, 5*60, 25*60, 15*60, 25*60, 5*60, 25*60, 5*60, 25*60, 5*60, 25*60, 15*60, 10*60],
            pomodoro: 25*60,
            shortBreak: 5*60,
            longBreak: 15*60,
        };
        this.toggleLoop = () => {this.setState({isLoopOn: !this.state.isLoopOn})};
        this.setTimerArray = (arr) => {this.setState({timerArray: arr})};
        this.setPomodoro = (num) => {this.setState({pomodoro: num})};
        this.setShortBreak = (num) => {this.setState({shortBreak: num})};
        this.setLongBreak = (num) => {this.setState({longBreak: num})};
        this.toggleInfo = this.toggleInfo.bind(this)
    }
    toggleInfo(){
        this.setState({showInfo: !this.state.showInfo})
    }
    render() {
        const value = {
            isLoopOn: this.state.isLoopOn,
            toggleLoop: this.toggleLoop,
            audioToPlay: sound,
            pomodoro: this.state.pomodoro,
            shortBreak:this.state.shortBreak,
            longBreak: this.state.longBreak,
            timerArray: this.state.timerArray,
            setTimerArray: this.setTimerArray,
            setPomodoro: this.setPomodoro,
            setShortBreak: this.setShortBreak,
            setLongBreak: this.setLongBreak
        };
        return (
            <div className="App">
                <Context.Provider value={value}>
                    <Header/>
                    <Pomodoro/>
                    {(this.state.showInfo) ? <Info/> : ''}
                    <button style={this.state.showInfo ? {transform: 'rotate(270deg)'} : {transform: 'rotate(90deg)'}} className='infoButton' onClick={this.toggleInfo}>{'>'}</button>
                    <TodoList/>
                    <Footer/>
                </Context.Provider>
            </div>
        );
    }
}


export default App;
