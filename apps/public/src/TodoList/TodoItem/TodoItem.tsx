import React, {ChangeEvent, KeyboardEvent, Dispatch} from 'react';
import pencil from '../assets/pencil.svg'
import trash from '../assets/trash.svg'
import add from '../assets/add.svg'
import {Todo, TodoReducerAction} from "../reducer/todosReducer";
import { IconButton } from 'koi-pool';
import './TodoItem.css'

type TodoItemProps = Todo & {
  id: string,
  todosDispatch: Dispatch<TodoReducerAction>,
}
const TodoItem = ({id, checked, goal, isEditing,  todosDispatch}: TodoItemProps) => {

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      todosDispatch({type: 'toggleEdit', id});
    }
  };
  const deleteGoal = () => {
    todosDispatch({type: "deleteTodo", id});
  };

  const toggleEdit = () => {
    todosDispatch({type: "toggleEdit", id})
  };

  const handleEdit = (event: ChangeEvent<HTMLInputElement>,) => {
    todosDispatch({type: "editTodo", id, goal: event.target.value})
  };
  const handleChecked = () => {
    todosDispatch({type: "toggleGoalCheck", id});
  };
  return (
    <div className={'TodoListItem'}>
      <input type='checkbox' onChange={handleChecked}
             checked={checked}/>{
      isEditing
        ? <input className={'TodoListItemEdit'} value={goal}
                 onChange={handleEdit} type={'text'}
                 onKeyDown={handleKeyPress}
                 />
        : <p onDoubleClick={toggleEdit}>{goal}</p>
    }
      <IconButton onClick={toggleEdit} alt={'Edit'}  src={
        isEditing
          ? add
          : pencil
      }/>
      <IconButton alt={'X'} src={trash} onClick={deleteGoal}>x</IconButton>
    </div>
  );
};


export default TodoItem;

