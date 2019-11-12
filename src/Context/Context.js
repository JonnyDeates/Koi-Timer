// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
import * as React from "react";

export const Context = React.createContext({
    isLoopOn: false,
    toggleTheme: () => {},
});