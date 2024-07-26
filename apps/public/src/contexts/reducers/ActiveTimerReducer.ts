export type CurrentSelectedTimerType = 'interval' | 'pomodoro' | 'longBreak' | 'shortBreak'

export type ActiveTimerReducerState = {
    isActive: boolean,
    isEditingTimer: boolean,
    currentTimer: CurrentSelectedTimerType,
    count: number,
    startingTime: number
}
export type ActiveTimerReducerAction =
    { type: 'setActiveTimer', newTime: number, currentTimer: CurrentSelectedTimerType }
    | { type: 'decreaseCount' }
    | { type: 'setIsActive', isActive: boolean }
    | { type: 'setIsEditingTimer', isEditingTimer: boolean }
    | { type: 'setCount', newTime: number, isActive?: boolean, isEditingTimer?: boolean }


export const activeTimerReducer = (state: ActiveTimerReducerState, action: ActiveTimerReducerAction) => {

    switch (action.type) {
        case 'setActiveTimer': {
            return {
                ...state,
                isActive: false,
                currentTimer: action.currentTimer,
                count: action.newTime,
                isEditingTimer: false
            }
        }
        case "decreaseCount": {
            const newTime  = new Date().getTime()/ 1000;
            if(state.startingTime === Infinity) {
               return {
                   ...state,
                   count: state.count-1,
                   isEditingTimer: false,
                   isActive: true,
                   startingTime: newTime + state.count-1
               }
            }
            if (state.count > 0) {
                return {
                    ...state,
                    count: Math.ceil(state.startingTime - newTime),
                    isActive: true,
                    isEditingTimer: false
                }
            }
            return {
                ...state,
                count: 0,
                isActive: true,
                isEditingTimer: false
            }
        }
        case "setIsActive": {
            return {
                ...state,
                isActive: action.isActive,
                isEditingTimer: action.isActive ? false : state.isEditingTimer,
                startingTime: action.isActive ? new Date().getTime() : Infinity
            }
        }
        case "setIsEditingTimer": {
            return {
                ...state,
                isActive: false,
                isEditingTimer: action.isEditingTimer
            }
        }
        case "setCount": {
            return {
                ...state,
                isEditingTimer: action.isEditingTimer === undefined ? state.isEditingTimer : action.isEditingTimer,
                isActive: action.isActive === undefined ? state.isActive : action.isActive,
                count: action.newTime,
                startingTime: Infinity
            }
        }
    }
};