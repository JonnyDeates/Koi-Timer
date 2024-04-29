import {createContext, ReactNode, useContext, useState} from "react";
import {SoundEffect} from "../Modals/Sounds/model/SoundEffect";
import {DEFAULT_SOUND} from "../Modals/Sounds/factory/SoundsFactory";

type SoundEffectContextType = {
    audioToPlay: SoundEffect,
    volume: number,
    handleSound: (newSound: SoundEffect) => void,
    handleVolume: (newVolume: number) => void,
}

export const SoundEffectContext = createContext<SoundEffectContextType>({} as SoundEffectContextType);

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