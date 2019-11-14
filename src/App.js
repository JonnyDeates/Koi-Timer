import React from 'react';
import './App.css';
import Header from "./Header/Header";
import Pomodoro from "./Pomodoro/Pomodoro";
import {Context} from "./Context/Context"
import Info from "./Info/Info";
import Footer from "./Footer/Footer";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoopOn: false
        };
        this.toggleLoop = () => {
            this.setState({isLoopOn: !this.state.isLoopOn})
        };
    }
    render() {
        const value = {
            isLoopOn: this.state.isLoopOn,
            toggleLoop: this.toggleLoop
        };
        return (
            <div className="App">
                <Context.Provider value={value}>
                    <Header/>
                    <Pomodoro/>
                    <Info/>
                    <Footer/>
                </Context.Provider>
            </div>
        );
    }
}


export default App;
