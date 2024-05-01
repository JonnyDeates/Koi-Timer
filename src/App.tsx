import React from 'react';
import './App.css';
import Header from "./Header/Header";
import Pomodoro from "./Pomodoro/Pomodoro";
import Info from "./Info/Info";
import Footer from "./Footer/Footer";
import TodoList from "./TodoList/TodoList";

const App = () => {

  return (
    <div className="App">
      <Header/>
      <Pomodoro/>
      <Info/>
      <TodoList/>
      <Footer/>
    </div>
  );
};


export default App;
