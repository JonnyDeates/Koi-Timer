import React, {useRef, useState} from 'react';
import {useSoundEffectContext} from "../../../contexts/SoundEffectContext";
import {SoundEffect} from "../model/SoundEffect";
import './SoundSection.css'
import SoundButtons from "../SoundButtons/SoundButtons";
const SoundSection = (soundEffect: SoundEffect) => {
    const {title, link, author, sound} = soundEffect;
    const {audioToPlay, volume, handleSound} = useSoundEffectContext();
    const ref = useRef<HTMLAudioElement>(null);
    const [isOn, setIsOn] = useState<boolean>(false);

    const isActive = audioToPlay.title === title;

    const handleStopSoundEffect = () => {
        setIsOn(false);
        if (ref.current) {
            ref.current.pause()
        }
    };

    const handlePlaySoundEffect = () => {
        setIsOn(true);
        if(ref.current){
            ref.current.volume = volume;
            ref.current.pause();
            ref.current.load();
            ref.current.play();
        }
    };

    const handleSetSound = () => {
        handleSound(soundEffect)
    };

    return (
        <div className={`SoundSection ${isActive ? 'active' : ''}`} onClick={handleSetSound}>
            <audio ref={ref}>
                <source src={sound}/>
            </audio>
            <div className={"SoundTitle"}>
                <h3>{title}</h3>
                <p title={`Open link to sound effect: ${link}`} className={"Title"} onClick={() => window.open(link)}>{author}</p>
            </div>
            <div className={"SoundButtonGroup"}>

                <SoundButtons isActive={isOn} handleStopSoundEffect={handleStopSoundEffect} handlePlaySoundEffect={handlePlaySoundEffect}/>
        </div>
        </div>
    );
};

export default SoundSection;
