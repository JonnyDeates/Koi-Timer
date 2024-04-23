// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useReducer, useState } from "react";
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
import { activeTimerReducer, ActiveTimerReducerAction, ActiveTimerReducerState } from "./reducers/ActiveTimerReducer";

export type UnitOfTimeType = 'second' | 'minute' | 'hour'

export type TimerContextType = {
    currentTimerSelected: ActiveTimerReducerState,
    showInfo: boolean,
    intervalPresets: IntervalPresetsReducerState,
    instanceTimer: InstanceTimerReducerState,
    handleToggleShowInfo: () => void,
    currentTimerDispatch: Dispatch<ActiveTimerReducerAction>,
    instanceTimerDispatch: Dispatch<InstanceTimerReducerAction>
    intervalPresetsDispatch: Dispatch<IntervalPresetsReducerAction>,
    unitOfTime: UnitOfTimeType,
    setUnitOfTime: Dispatch<SetStateAction<UnitOfTimeType>>,
}


export const TimerContext = createContext<TimerContextType>({} as TimerContextType);

const TimerContextProvider = ({ children }: { children: ReactNode }) => {
    const [showInfo, setShowInfo] = useState<boolean>(true);
    const [unitOfTime, setUnitOfTime] = useState<UnitOfTimeType>('minute');

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
        count: 25 * 60,
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
        unitOfTime,
        setUnitOfTime
    };

    return <TimerContext.Provider value={value}>
        {children}
    </TimerContext.Provider>
};
export default TimerContextProvider;

export const useTimerContext = () => useContext(TimerContext);