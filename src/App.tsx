import React from 'react';
import './App.css';
import Header from "./Header/Header";
import Pomodoro from "./Pomodoro/Pomodoro";
import Info from "./Info/Info";
import Footer from "./Footer/Footer";
import TodoList from "./TodoList/TodoList";
import arrow from './Assets/icons/Arrow.png'
import { getStorage, setStorage } from "./Utlis/localStorage";
import { useTimerContext } from 'Context/TimerContext';

const App = () => {
    const { showInfo, handleToggleShowInfo } = useTimerContext()
    return (
        <div className="App">
            <Header />
            <Pomodoro />
            {(showInfo) ? <Info /> : ''}
            <button style={showInfo ? { transform: 'rotate(270deg)' } : { transform: 'rotate(90deg)' }} className='infoButton' onClick={handleToggleShowInfo}>
                <img src={arrow} alt={'>'} />
            </button>
            <TodoList />
            <Footer />
        </div>
    );
}


export default App;
