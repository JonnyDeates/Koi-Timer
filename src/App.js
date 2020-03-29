import React from 'react';
import './App.css';
import Header from "./Header/Header";
import Pomodoro from "./Pomodoro/Pomodoro";
import {Context} from "./Context/Context"
import Info from "./Info/Info";
import Footer from "./Footer/Footer";
import sound from './Assets/Sounds/analog_alarm_clock.wav'
import TodoList from "./TodoList/TodoList";
import arrow from './Assets/icons/Arrow.png'
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoopOn: false,
            showInfo: true,
            presets: [{
                title: 'The Standard',
                desc: 'The standard model of the pomodoro drone.',
                timeArray: [25, 5, 25, 5, 25, 5, 25, 15, 25, 5, 25, 5, 25, 5, 25, 15, 10]
            },
                {
                    title: 'The Koi Timer',
                    desc: 'My idea of a good work ethic.',
                    timeArray: [25, 5, 25, 5, 25, 5, 25, 20, 30, 5, 25, 5, 25, 5, 25, 20, 25]
                },
                {
                    title: 'The Revised Standard',
                    desc: 'A revised model of the pomodoro drone, shorter in case to fit some people\'s time constraints.',
                    timeArray: [20, 5, 20, 5, 20, 5, 20, 15, 20, 5, 20, 5, 20, 5, 20, 15, 20]
                }],
            currentPresetActive: 0,
            timerArray: [25 * 60, 5 * 60, 25 * 60, 5 * 60, 25 * 60, 5 * 60, 25 * 60, 15 * 60, 25 * 60, 5 * 60, 25 * 60, 5 * 60, 25 * 60, 5 * 60, 25 * 60, 15 * 60, 10 * 60],
            pomodoro: 25 * 60,
            shortBreak: 5 * 60,
            longBreak: 15 * 60,
        };
        this.toggleLoop = () => {
            this.setState({isLoopOn: !this.state.isLoopOn})
        };
        this.handleCurrentActive = (i) => {
            this.setState({currentPresetActive: i})
        };
        this.setTimerArray = (arr) => {
            this.setState({timerArray: arr})
        };
        this.setPomodoro = (num) => {
            this.setState({pomodoro: num})
        };
        this.setShortBreak = (num) => {
            this.setState({shortBreak: num})
        };
        this.setLongBreak = (num) => {
            this.setState({longBreak: num})
        };
        this.addPreset = (preset) => {
            this.setState({presets: [...this.state.presets, preset], timerArray: preset.timeArray.map((x) => x*60), currentPresetActive: this.state.presets.length})
        };
        this.deletePreset = (i) => {
            let x = this.state.presets;
            x.splice(i,1);
            this.setState({presets: x})
        };
        this.toggleInfo = this.toggleInfo.bind(this)
    }

    toggleInfo() {
        this.setState({showInfo: !this.state.showInfo})
    }

    render() {
        const value = {
            isLoopOn: this.state.isLoopOn,
            toggleLoop: this.toggleLoop,
            audioToPlay: sound,
            presets: this.state.presets,
            pomodoro: this.state.pomodoro,
            shortBreak: this.state.shortBreak,
            longBreak: this.state.longBreak,
            timerArray: this.state.timerArray,
            currentPresetActive: this.state.currentPresetActive,
            handleCurrentActive: this.handleCurrentActive,
            setTimerArray: this.setTimerArray,
            setPomodoro: this.setPomodoro,
            setShortBreak: this.setShortBreak,
            setLongBreak: this.setLongBreak,
            addPreset: this.addPreset,
            deletePreset: this.deletePreset
        };
        return (
            <div className="App">
                <Context.Provider value={value}>
                    <Header/>
                    <Pomodoro/>
                    {(this.state.showInfo) ? <Info/> : ''}
                    <button style={this.state.showInfo ? {transform: 'rotate(270deg)'} : {transform: 'rotate(90deg)'}}
                            className='infoButton' onClick={this.toggleInfo}><img src={arrow} alt={'>'}/></button>
                    <TodoList/>
                    <Footer/>
                </Context.Provider>
            </div>
        );
    }
}


export default App;
