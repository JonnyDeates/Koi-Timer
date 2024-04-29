import React, {ChangeEvent, useRef, useState} from 'react';
import '../Modals.css'
import SoundSection from "./SoundSection/SoundSection";
import {useSoundEffectContext} from "../../Context/SoundEffectContext";
import {Button} from "koi-pool";
import {DEFAULT_SOUND_LIST} from "./factory/SoundsFactory";



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
                            ? <Button onClick={handleStopAudio}>Stop</Button>
                            : <Button onClick={handlePlayAudio}>Play</Button>
                    }
                </div>
                <div className={'SoundList'}>
                  {DEFAULT_SOUND_LIST.map((soundEffect, i) =>
                    <SoundSection key={i} {...soundEffect}/>
                  )}
                </div>

            </>
    );
};


export default SoundsModal;

