// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
import {createContext, Dispatch, ReactNode, useContext, useReducer, useState} from "react";
import {
    DEFAULT_LONG_BREAK,
    DEFAULT_POMODORO,
    DEFAULT_SHORT_BREAK,
    instanceTimerReducer,
    InstanceTimerReducerAction, InstanceTimerReducerState
} from "./reducers/InstanceTimerReducer";
import intervalPresetsReducer, {
    DEFAULT_PRESETS,
    IntervalPresetsReducerAction,
    IntervalPresetsReducerState
} from "./reducers/IntervalPresetsReducer";
import {activeTimerReducer, ActiveTimerReducerAction, ActiveTimerReducerState} from "./reducers/ActiveTimerReducer";


export type TimerContextType = {
    currentTimerSelected: ActiveTimerReducerState,
    showInfo: boolean,
    intervalPresets: IntervalPresetsReducerState,
    instanceTimer: InstanceTimerReducerState,
    handleToggleShowInfo: () => void,
    currentTimerDispatch: Dispatch<ActiveTimerReducerAction>,
    instanceTimerDispatch: Dispatch<InstanceTimerReducerAction>
    intervalPresetsDispatch: Dispatch<IntervalPresetsReducerAction>,
}

export const TimerContext = createContext<TimerContextType>({} as TimerContextType);

const TimerContextProvider = ({children}: { children: ReactNode }) => {
    const [showInfo, setShowInfo] = useState<boolean>(true);
    const [instanceTimer, instanceTimerDispatch] = useReducer(instanceTimerReducer, {
        pomodoro: DEFAULT_POMODORO,
        shortBreak: DEFAULT_SHORT_BREAK,
        longBreak: DEFAULT_LONG_BREAK
    });
    const [intervalPresets, intervalPresetsDispatch] = useReducer(intervalPresetsReducer, {
        presets: DEFAULT_PRESETS,
        currentPresetId: 'theStandard',
        intervalIndex: 0
    });
    const [currentTimerSelected, currentTimerDispatch] = useReducer(activeTimerReducer, {
        isActive: false,
        currentTimer: "pomodoro",
        count: 25,
    });

    const handleToggleShowInfo = () => {
        setShowInfo(!showInfo)
    };

    const value: TimerContextType = {
        currentTimerSelected,
        showInfo,
        intervalPresets,
        instanceTimer,
        handleToggleShowInfo,
        currentTimerDispatch,
        instanceTimerDispatch,
        intervalPresetsDispatch,
    };

    return <TimerContext.Provider value={value}>
        {children}
    </TimerContext.Provider>
};
export default TimerContextProvider;

export const useTimerContext = () => useContext(TimerContext);