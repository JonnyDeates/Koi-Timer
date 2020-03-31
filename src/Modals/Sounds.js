import React from 'react';
import './Modals.css'
import {Context} from "../Context/Context";
import SoundSection from "./SoundSection/SoundSection";
import alarm1 from '../Assets/Sounds/Alarm.wav';
import alarm2 from '../Assets/Sounds/Alarm2.wav';
import alarm3 from '../Assets/Sounds/Alarm3.wav';
import alarm4 from '../Assets/Sounds/Alarm4.wav';
import alarm5 from '../Assets/Sounds/analog_alarm_clock.wav';
import bell from '../Assets/Sounds/Bell.wav';
import fireAlarm from '../Assets/Sounds/FireAlarm.wav';
import {getStorage, setStorage} from "../Utlis/localStorage";
class Sounds extends React.Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        this.state = {
            active: this.props.active,
            volume: 1,
            isPlaying: null,
            isOn: false,
            currentSound: {
                title: 'Analog Alarm Clock',
                author: 'bone666138',
                link: 'https://freesound.org/people/bone666138/sounds/198841/'
            },
            sounds: [{
                title: 'Analog Alarm Clock',
                author: 'bone666138',
                soundEffect: alarm5,
                link: 'https://freesound.org/people/bone666138/sounds/198841/'
                }, {
                title: 'Alarm Clock',
                author: 'ZyryTSounds',
                soundEffect: alarm4,
                link: 'https://freesound.org/people/ZyryTSounds/sounds/219244/'
            }, {
                title: 'Bell',
                author: 'DDmyzik',
                soundEffect: bell,
                link: 'https://freesound.org/people/DDmyzik/sounds/460262/'
            }, {
                title: 'Alarm Buzz',
                author: 'coltonmanz',
                soundEffect: alarm1,
                link: 'https://freesound.org/people/coltonmanz/sounds/381382/'
            }, {
                title: 'Alarm Beep',
                author: 'kwahmah_02',
                soundEffect: alarm2,
                link: 'https://freesound.org/people/kwahmah_02/sounds/250629/'
            }, {
                title: 'Smoke Detector',
                author: 'SpliceSound',
                soundEffect: fireAlarm,
                link: 'https://freesound.org/people/SpliceSound/sounds/369848/'
            }, {
                title: 'Alarm Scifi',
                author: 'JomelleJager',
                soundEffect: alarm3,
                link: 'https://freesound.org/people/JomelleJager/sounds/248211/'
            }
            ]
        };
        this.setSound = this.setSound.bind(this);
    };

    componentDidMount() {
        this.setState({currentSound: getStorage('soundSelected', this.state.currentSound)});
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.active !== prevProps.active) {
            this.setState({active: this.props.active});
        }
        if(this.props.volume !== prevProps.volume) {
            this.setState({volume: this.props.volume})
        }
    }

    handleVolumeChange(e) {
        let x = parseFloat(e.target.value);
        this.context.setVolume(x);
        this.setState({volume: x})
    }

    setSound(obj){
        let {title, author, link, soundEffect} = obj;
        this.setState({currentSound: {title, author, link}}, () => setStorage(this.state.currentSound, 'soundSelected'));
        this.context.setSound(soundEffect);
    }
    render() {
        return (
            <div className={(!this.state.active) ? 'active' : 'modalWrapper'}>
                <div className={(!this.state.active) ? 'active' : 'modalWrapper'} onClick={this.props.setSounds}/>
                <div className="presets sounds">
                    <button onClick={this.props.setSounds}>X</button>
                    <h1>Alarm Settings</h1>
                    <h2>Currently Set: {this.state.currentSound.title}</h2>
                    <h3>Author: <span onClick={()=> window.open(this.state.currentSound.link)}>{this.state.currentSound.author}</span></h3>
                    <label>Volume</label>
                    <input type="range" onChange={this.handleVolumeChange}
                           min={0} max={1} value={this.state.volume} step="0.01"/>

                    <div className={'sounds-button'}>
                        <audio ref="testAudio">
                            <source src={this.state.isPlaying}/>
                        </audio>
                        {(this.state.isOn) ?
                            <button onClick={() => this.setState({isOn: false}, function () {
                                this.refs.testAudio.pause();
                            })}>Stop
                            </button> :
                            <button onClick={() => this.setState({
                                isPlaying: this.context.audioToPlay,
                                isOn: true
                            }, function () {
                                this.refs.testAudio.volume = this.context.volume;
                                this.refs.testAudio.pause();
                                this.refs.testAudio.load();
                                this.refs.testAudio.play();
                            })}>Play</button>}
                    </div>
                    {this.state.sounds.map((obj, i) => <SoundSection key={i} active={this.state.currentSound.title === obj.title}
                                                                     volume={this.context.volume} setSound={this.setSound}
                                                                     soundEffect={obj.soundEffect} title={obj.title}
                                                                     author={obj.author} link={obj.link}/>)}
                </div>
            </div>
        );
    }

}


export default Sounds;

