import React, {ChangeEvent, FormEvent, MouseEvent, useReducer, useState} from 'react';
import './TodoList.css'
import TodoItem from "./TodoItem/TodoItem";
import todosReducer from "./reducer/todosReducer";
import {Button, FloatingLabelInput} from 'koi-pool';

const TodoList = () => {
    const [{todos, totalChecked}, todosDispatch] = useReducer(todosReducer, {todos: {}, totalChecked: 0});
    const [newGoal, setNewGoal] = useState<string>("");

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
        <div className="TodoList">
            <p>Completed: {totalChecked}</p>
            <h1>TodoList</h1>
            <form
                onSubmit={handleSubmit}>
                <FloatingLabelInput label={'Goal'} value={newGoal} onChange={handlNewGoal} width={"50vw"} type={'text'}
                                    divProps={{className: "TodoItemGoal"}}/>
                <Button onClick={handleSubmit} variant='accept'>+</Button>
            </form>
            <div>
                {todoKeys.map((todoId, i) =>
                    <TodoItem key={i} {...todos[todoId]} id={todoId}
                              todosDispatch={todosDispatch}/>)}
            </div>
        </div>
    );
};

export default TodoList;

