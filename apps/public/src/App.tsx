import React from 'react';
import './App.css';
import Pomodoro from "./Pomodoro/Pomodoro";
import Footer from "./Footer/Footer";
import TodoList from "./TodoList/TodoList";
import Header from './Header/Header';

const App = () => {

  return (
    <div className="App">
      <Header/>
      <Pomodoro/>
      {/*<Info/>*/}
      <TodoList/>
      <Footer/>
    </div>
  );
};


export default App;
