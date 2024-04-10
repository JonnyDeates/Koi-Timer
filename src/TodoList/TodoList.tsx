import React, {ChangeEvent, FormEvent, MouseEvent, useReducer, useState} from 'react';
import TrackVisibility from "../Utlis/TrackVisibility";
import './TodoList.css'
import TodoItem from "./TodoItem/TodoItem";
import todosReducer from "./reducer/todosReducer";
import { Button } from 'koi-pool';

const TodoList = () => {
  const [{todos, totalChecked}, todosDispatch] = useReducer(todosReducer, {todos: {}, totalChecked: 0});
  const [newGoal, setNewGoal] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handlNewGoal = (event: ChangeEvent<HTMLInputElement>) => {
    setNewGoal(event.target.value)
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (newGoal.trim().length !== 0) {
      todosDispatch({type: "addTodo", goal: newGoal});
      setNewGoal("");
    }
  };

  const todoKeys = Object.keys(todos);

  return (
    <TrackVisibility onVisible={() => setIsVisible(true)}>
      <div className="todolist">
        <p
          style={{animation: isVisible ? '1s 1s slide-in-right forwards' : ''}}>Completed: {totalChecked}</p>
        <h1 style={{animation: isVisible ? '1s slide-in-up forwards' : ''}}>TodoList</h1>
        <form style={{animation: isVisible ? '1s 1s slide-in-up forwards' : ''}}
              onSubmit={handleSubmit}>
          <label>
            Goal:
            <input type="text" value={newGoal} onChange={handlNewGoal}/>
          </label>
          <Button onClick={handleSubmit}>+</Button>
        </form>
        <div style={{animation: isVisible ? '1s 2s fade-in forwards' : ''}}>
          {todoKeys.map((todoId, i) =>
            <TodoItem key={i} {...todos[todoId]} id={todoId} bgColor={(i % 2) ? 'tinted' : ''}
                      todosDispatch={todosDispatch}/>)}
        </div>
      </div>
    </TrackVisibility>
  );
};

export default TodoList;

