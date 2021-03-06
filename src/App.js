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
import {getStorage, setStorage} from "./Utlis/localStorage";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoopOn: true,
            showInfo: true,
            audioToPlay: sound,
            presets: [{
                title: 'The Standard',
                desc: 'The standard model of the pomodoro drone.',
                timeArray: [25, 5, 25, 5, 25, 5, 25, 15, 25, 5, 25, 5, 25, 5, 25, 15, 10],
                id: 'theStandard'
            },
                {
                    title: 'The Koi Timer',
                    desc: 'My idea of a good work ethic.',
                    timeArray: [25, 5, 25, 5, 25, 5, 25, 20, 30, 5, 25, 5, 25, 5, 25, 20, 25],
                    id: 'theKoiTimer'
                },
                {
                    title: 'The Revised Standard',
                    desc: 'A revised model of the pomodoro drone, shorter in case to fit some people\'s time constraints.',
                    timeArray: [20, 5, 20, 5, 20, 5, 20, 15, 20, 5, 20, 5, 20, 5, 20, 15, 20],
                    id: 'theRevisedStandard'
                }],
            currentPresetActive: 0,
            timerArray: [25 * 60, 5 * 60, 25 * 60, 5 * 60, 25 * 60, 5 * 60, 25 * 60, 15 * 60, 25 * 60, 5 * 60, 25 * 60, 5 * 60, 25 * 60, 5 * 60, 25 * 60, 15 * 60, 10 * 60],
            pomodoro: 25 * 60,
            shortBreak: 5 * 60,
            longBreak: 15 * 60,
            volume: 1
        };
        this.toggleLoop = () => {
            this.setState({isLoopOn: !this.state.isLoopOn})
        };
        this.setSound = (audio) => {
            this.setState({audioToPlay: audio}, () => setStorage(this.state.audioToPlay, 'audio'));

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
        this.setVolume = (num) => {
            this.setState({volume: num}, () => setStorage(this.state.volume, 'volume'))
        };
        this.addPreset = (preset) => {
            this.setState({
                    presets: [...this.state.presets, preset],
                    timerArray: preset.timeArray.map((x) => x * 60),
                    currentPresetActive: this.state.presets.length
                },
                () => setStorage(this.state.presets, 'presets'))
        };
        this.toggleInfo = this.toggleInfo.bind(this);
        this.deletePreset = this.deletePreset.bind(this);
    }

    toggleInfo() {
        this.setState({showInfo: !this.state.showInfo})
    }

    deletePreset(id) {
        let presets = this.state.presets;
        let index = presets.findIndex((preset) => preset.id === id);
        presets.splice(index, 1);
        presets.map((preset, i) => (i>= 3)? preset.title = `Custom Preset ${i-2}` : preset.title);
        this.setState({presets}, () => setStorage(this.state.presets, 'presets'));
        if (this.state.currentPresetActive === index) {
            setTimeout(() => this.setState({
                currentPresetActive: 0,
                timerArray: presets[0].timeArray.map((x) => x * 60)
            }), 100);
        }
    };

    componentDidMount() {
        this.setState({
            presets: getStorage('presets', this.state.presets),
            audioToPlay: getStorage('audio', this.state.audioToPlay),
            volume: getStorage('volume', this.state.volume)
        })
    }

    render() {
        const value = {
            isLoopOn: this.state.isLoopOn,
            toggleLoop: this.toggleLoop,
            audioToPlay: this.state.audioToPlay,
            volume: this.state.volume,
            presets: this.state.presets,
            pomodoro: this.state.pomodoro,
            shortBreak: this.state.shortBreak,
            longBreak: this.state.longBreak,
            timerArray: this.state.timerArray,
            currentPresetActive: this.state.currentPresetActive,
            handleCurrentActive: this.handleCurrentActive,
            setTimerArray: this.setTimerArray,
            setSound: this.setSound,
            setPomodoro: this.setPomodoro,
            setShortBreak: this.setShortBreak,
            setLongBreak: this.setLongBreak,
            setVolume: this.setVolume,
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
