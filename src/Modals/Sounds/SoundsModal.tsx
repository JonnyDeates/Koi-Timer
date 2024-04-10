import React, {ChangeEvent, useRef, useState} from 'react';
import '../Modals.css'
import alarm1 from '../../Assets/Sounds/Alarm.wav';
import alarm2 from '../../Assets/Sounds/Alarm2.wav';
import alarm3 from '../../Assets/Sounds/Alarm3.wav';
import alarm4 from '../../Assets/Sounds/Alarm4.wav';
import alarm5 from '../../Assets/Sounds/analog_alarm_clock.wav';
import bell from '../../Assets/Sounds/Bell.wav';
import fireAlarm from '../../Assets/Sounds/FireAlarm.wav';
import SoundSection from "./SoundSection/SoundSection";
import {SoundEffect, useSoundEffectContext} from "../../Context/SoundEffectContext";

const allSounds: SoundEffect[] = [{
    title: 'Analog Alarm Clock',
    author: 'bone666138',
    sound: alarm5,
    link: 'https://freesound.org/people/bone666138/sounds/198841/'
}, {
    title: 'Alarm Clock',
    author: 'ZyryTSounds',
    sound: alarm4,
    link: 'https://freesound.org/people/ZyryTSounds/sounds/219244/'
}, {
    title: 'Bell',
    author: 'DDmyzik',
    sound: bell,
    link: 'https://freesound.org/people/DDmyzik/sounds/460262/'
}, {
    title: 'Alarm Buzz',
    author: 'coltonmanz',
    sound: alarm1,
    link: 'https://freesound.org/people/coltonmanz/sounds/381382/'
}, {
    title: 'Alarm Beep',
    author: 'kwahmah_02',
    sound: alarm2,
    link: 'https://freesound.org/people/kwahmah_02/sounds/250629/'
}, {
    title: 'Smoke Detector',
    author: 'SpliceSound',
    sound: fireAlarm,
    link: 'https://freesound.org/people/SpliceSound/sounds/369848/'
}, {
    title: 'Alarm Scifi',
    author: 'JomelleJager',
    sound: alarm3,
    link: 'https://freesound.org/people/JomelleJager/sounds/248211/'
}
];

const SoundsModal = () => {

    const {handleVolume, audioToPlay, volume} = useSoundEffectContext();
    const [isPlaying, setIsPlaying] = useState<string>('');
    const [isOn, setIsOn] = useState(false);
    const ref = useRef<HTMLAudioElement>(null);

    const handleStopAudio = () => {
        setIsOn(false);
        if (ref.current) {
            ref.current.pause();
        }
    };
    const handlePlayAudio = () => {
        setIsOn(true);
        setIsPlaying(audioToPlay.sound)
        if (ref.current) {
            ref.current.volume = volume;
            ref.current.pause();
            ref.current.load();
            ref.current.play();
        }
    };
    const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newVolume = parseFloat(e.target.value);
        handleVolume(newVolume);
    };
    return (<>
                <h2>Currently Set: {audioToPlay.title}</h2>
                <h3>Author: <span
                    onClick={() => window.open(audioToPlay.link)}>{audioToPlay.author}</span>
                </h3>
                <label>Volume</label>
                <input type="range" onChange={handleVolumeChange}
                       min={0} max={1} value={volume} step="0.01"/>

                <div className={'sounds-button'}>
                    <audio ref={ref}>
                        <source src={isPlaying}/>
                    </audio>
                    {
                        isOn
                            ? <button onClick={handleStopAudio}>Stop</button>
                            : <button onClick={handlePlayAudio}>Play</button>
                    }
                </div>
                {allSounds.map((soundEffect, i) =>
                    <SoundSection key={i} {...soundEffect}/>
                )}
            </>
    );
};


export default SoundsModal;

