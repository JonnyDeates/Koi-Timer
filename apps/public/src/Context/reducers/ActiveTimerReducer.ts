export type CurrentSelectedTimerType = 'interval' | 'pomodoro' | 'longBreak' | 'shortBreak'

export type ActiveTimerReducerState = { isActive: boolean, currentTimer: CurrentSelectedTimerType, count: number }
export type ActiveTimerReducerAction =
    { type: 'setActiveTimer', newTime: number, currentTimer: CurrentSelectedTimerType }
    | { type: 'decreaseCount' }
    | { type: 'setIsActive', isActive: boolean }
    | { type: 'setCount', newTime: number, isActive?: boolean }


export const activeTimerReducer = (state: ActiveTimerReducerState, action: ActiveTimerReducerAction) => {

    switch (action.type) {
        case 'setActiveTimer': {
            return {isActive: false, currentTimer: action.currentTimer, count: action.newTime}
        }
        case "decreaseCount": {
            return {...state, count: state.count - 1, isActive: true}
        }
        case "setIsActive": {
            return {...state, isActive: action.isActive}
        }
        case "setCount": {
            return {
                ...state,
                isActive: action.isActive === undefined ? state.isActive : action.isActive,
                count: action.newTime
            }
        }
    }
};