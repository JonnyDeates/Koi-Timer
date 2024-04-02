// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
import { Dispatch, ReactNode, createContext, useContext, useReducer, useState } from "react";
import sound from '../Assets/Sounds/analog_alarm_clock.wav'

type TimerContextType = {
    isLoopOn: boolean,
    showInfo: boolean,
    audioToPlay: string,
    volume: number,
    presets: Preset[],
    currentPresetId: string,
    pomodoro: number,
    shortBreak: number,
    longBreak: number,
    handleSound: (newSound: string) => void,
    handleVolume: (newVolume: number) => void,
    handleToggleLoop: ()=> void,
    handleToggleShowInfo: ()=>void,
    presetsDispatch: Dispatch<PresetsReducerAction>,
    pomodoroDispatch: Dispatch<PomodoroReducerAction>
}

export const TimerContext = createContext<TimerContextType>({} as TimerContextType);

export type Preset = { title: string, description: string, timeInterval: number[], id: string }

const DEFAULT_PRESETS: Preset[] = [{
    title: 'The Standard',
    description: 'The standard model of the pomodoro drone.',
    timeInterval: [25, 5, 25, 5, 25, 5, 25, 15, 25, 5, 25, 5, 25, 5, 25, 15, 10],
    id: 'theStandard'
},
{
    title: 'The Koi Timer',
    description: 'My idea of a good work ethic.',
    timeInterval: [25, 5, 25, 5, 25, 5, 25, 20, 30, 5, 25, 5, 25, 5, 25, 20, 25],
    id: 'theKoiTimer'
},
{
    title: 'The Revised Standard',
    description: 'A revised model of the pomodoro drone, shorter in case to fit some people\'s time constraints.',
    timeInterval: [20, 5, 20, 5, 20, 5, 20, 15, 20, 5, 20, 5, 20, 5, 20, 15, 20],
    id: 'theRevisedStandard'
}];

export const DEFAULT_PRESET_IDS = DEFAULT_PRESETS.map(preset => preset.id)

const DEFAULT_POMODORO = 25;
const DEFAULT_SHORT_BREAK = 5;
const DEFAULT_LONG_BREAK = 15;


type PomodoroReducerState = { pomodoro: number, shortBreak: number, longBreak: number }
type PomodoroReducerAction = { type: keyof PomodoroReducerState, value: number }
const pomodoroReducer = (state: PomodoroReducerState, action: PomodoroReducerAction) => {
    return { ...state, [action.type]: action.value }
}

type PresetsReducerState = {presets: Preset[], currentPresetId: string}
type PresetsReducerAction = {type: "addPreset", preset: Preset} | {type: "removePreset" | "changePreset", id: string}
const presetsReducer = (state: PresetsReducerState, action: PresetsReducerAction) => {
    switch(action.type){
        case "addPreset":
            return {
                presets: [...state.presets, action.preset],
                currentPresetId: action.preset.id
            }
        case "changePreset":
            return {
                ...state,
                currentPresetId: action.id
            }
        case "removePreset": {
            return {
                presets: state.presets.filter(x => x.id !== action.id),
                currentPresetId: 'theStandard'
            }
        }
    }
}

const TimerContextProvider = ({ children }: { children: ReactNode }) => {
    const [isLoopOn, setIsLoopOn] = useState<boolean>(true);
    const [showInfo, setShowInfo] = useState<boolean>(true);
    const [audioToPlay, setAudioToPlay] = useState<string>(sound);
    const [volume, setVolume] = useState<number>(1)
    const [{shortBreak, longBreak, pomodoro}, pomodoroDispatch] = useReducer(pomodoroReducer, { pomodoro: DEFAULT_POMODORO, shortBreak: DEFAULT_SHORT_BREAK, longBreak: DEFAULT_LONG_BREAK })
    const [{presets, currentPresetId}, presetsDispatch] = useReducer(presetsReducer, { presets: DEFAULT_PRESETS, currentPresetId: 'theStandard' })

    const handleToggleLoop = () => {
        setIsLoopOn(!isLoopOn)
    };
    const handleToggleShowInfo = () => {
        setShowInfo(!showInfo)
    };
    const handleSound = (newAudio: string) => {
        setAudioToPlay(newAudio);
    };
    const handleVolume = (newVolume: number) => {
        setVolume(newVolume);
    };

    const value = {
        isLoopOn,
        showInfo,
        audioToPlay,
        volume,
        presets,
        currentPresetId,
        pomodoro,
        shortBreak,
        longBreak,
        handleSound,
        handleVolume,
        handleToggleLoop,
        handleToggleShowInfo,
        presetsDispatch,
        pomodoroDispatch,
    };

    return <TimerContext.Provider value={value}>
        {children}
    </TimerContext.Provider>
}
export default TimerContextProvider;
export const useTimerContext = () => useContext(TimerContext)