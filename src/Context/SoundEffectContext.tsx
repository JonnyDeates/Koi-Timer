// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
import {createContext, ReactNode, useContext, useState} from "react";
import sound from '../Assets/Sounds/analog_alarm_clock.wav'

type SoundEffectContextType = {
    audioToPlay: SoundEffect,
    volume: number,
    handleSound: (newSound: SoundEffect) => void,
    handleVolume: (newVolume: number) => void,
}

export const SoundEffectContext = createContext<SoundEffectContextType>({} as SoundEffectContextType);

export type SoundEffect = {
    title: string,
    author: string,
    sound: string,
    link: string
}

const DEFAULT_SOUND: SoundEffect = {
    title: 'Analog Alarm Clock',
    author: 'bone666138',
    sound,
    link: 'https://freesound.org/people/bone666138/sounds/198841/'
};

const SoundEffectContextProvider = ({children}: { children: ReactNode }) => {
    const [audioToPlay, setAudioToPlay] = useState<SoundEffect>(DEFAULT_SOUND);
    const [volume, setVolume] = useState<number>(1);

    const handleSound = (newAudio: SoundEffect) => {
        setAudioToPlay(newAudio);
    };
    const handleVolume = (newVolume: number) => {
        setVolume(newVolume);
    };

    const value = {
        audioToPlay,
        volume,
        handleSound,
        handleVolume,
    };

    return <SoundEffectContext.Provider value={value}>
        {children}
    </SoundEffectContext.Provider>
};
export default SoundEffectContextProvider;

export const useSoundEffectContext = () => useContext(SoundEffectContext);