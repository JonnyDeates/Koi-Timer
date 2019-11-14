// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
import * as React from "react";
export const Context = React.createContext({
    isLoopOn: false,
    audioToPlay: null,
    pomodoro: 25*60,
    shortBreak: 5*60,
    longBreak: 15*60,
    toggleLoop: () => {},
});