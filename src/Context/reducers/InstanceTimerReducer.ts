export const DEFAULT_POMODORO = 25 * 60;
export const DEFAULT_SHORT_BREAK = 5 * 60;
export const DEFAULT_LONG_BREAK = 15 * 60;


export type InstanceTimerType = keyof InstanceTimerReducerState;
export type InstanceTimerReducerState = { pomodoro: number, shortBreak: number, longBreak: number }
export type InstanceTimerReducerAction = { type: InstanceTimerType, value: number }
    | { type: 'resetToDefaults' }


export const instanceTimerReducer = (state: InstanceTimerReducerState, action: InstanceTimerReducerAction): InstanceTimerReducerState => {
    if (action.type === 'resetToDefaults') {
        return { 
            pomodoro: DEFAULT_POMODORO, 
            longBreak: DEFAULT_LONG_BREAK, 
            shortBreak: DEFAULT_SHORT_BREAK 
        }
    } else {
        return { ...state, [action.type]: action.value }
    }
};