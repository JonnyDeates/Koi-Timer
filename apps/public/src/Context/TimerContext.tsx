// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useReducer, useState} from "react";
import {
  DEFAULT_LONG_BREAK,
  DEFAULT_POMODORO,
  DEFAULT_SHORT_BREAK,
  instanceTimerReducer,
  InstanceTimerReducerAction,
  InstanceTimerReducerState
} from "./reducers/InstanceTimerReducer";
import intervalPresetsReducer, {
  DEFAULT_PRESETS,
  IntervalPresetsReducerAction,
  IntervalPresetsReducerState
} from "./reducers/IntervalPresetsReducer";
import {activeTimerReducer, ActiveTimerReducerAction, ActiveTimerReducerState} from "./reducers/ActiveTimerReducer";

export type UnitOfTimeType = 'second' | 'minute' | 'hour'

export type TimerContextType = {
  currentTimerSelected: ActiveTimerReducerState,
  intervalPresets: IntervalPresetsReducerState,
  instanceTimer: InstanceTimerReducerState,
  currentTimerDispatch: Dispatch<ActiveTimerReducerAction>,
  instanceTimerDispatch: Dispatch<InstanceTimerReducerAction>
  intervalPresetsDispatch: Dispatch<IntervalPresetsReducerAction>,
  unitOfTime: UnitOfTimeType,
  setUnitOfTime: Dispatch<SetStateAction<UnitOfTimeType>>,
  isEditingTimer: boolean,
  setIsEditingTimer: Dispatch<SetStateAction<boolean>>
}


export const TimerContext = createContext<TimerContextType>({} as TimerContextType);

const TimerContextProvider = ({children}: { children: ReactNode }) => {
  const [unitOfTime, setUnitOfTime] = useState<UnitOfTimeType>('minute');
  const [isEditingTimer, setIsEditingTimer] = useState<boolean>(false)
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


  const value:TimerContextType = useMemo(() => ({
    currentTimerSelected,
    intervalPresets,
    instanceTimer,
    currentTimerDispatch,
    instanceTimerDispatch,
    intervalPresetsDispatch,
    unitOfTime,
    setUnitOfTime,
    isEditingTimer,
    setIsEditingTimer
  }), [currentTimerSelected, instanceTimer, unitOfTime, intervalPresets, isEditingTimer]);

  return <TimerContext.Provider value={value}>
    {children}
  </TimerContext.Provider>
};
export default TimerContextProvider;

export const useTimerContext = () => useContext(TimerContext);
