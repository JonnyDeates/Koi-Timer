import React from 'react';
import './App.css';
import Header from "./Header/Header";
import Pomodoro from "./Pomodoro/Pomodoro";
import {Context} from "./Context/Context"
import Info from "./Info/Info";
import Footer from "./Footer/Footer";

function App() {
    return (
        <div className="App">
            <Context.Provider>
                <Header/>
                <Pomodoro/>
                <Info/>
                <Footer/>
            </Context.Provider>
        </div>
    );
}


export default App;