import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TimerContextProvider from 'Context/TimerContext';
const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
    <TimerContextProvider>
        <App />
    </TimerContextProvider>
    );

