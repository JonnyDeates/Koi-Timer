import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TimerContextProvider from './contexts/TimerContext';
import SoundEffectContextProvider from "./contexts/SoundEffectContext";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
    <TimerContextProvider>
        <SoundEffectContextProvider>
            <App/>
        </SoundEffectContextProvider>
    </TimerContextProvider>
);

