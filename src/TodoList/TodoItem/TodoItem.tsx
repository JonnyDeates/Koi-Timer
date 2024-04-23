import React, {ChangeEvent, KeyboardEvent, Dispatch} from 'react';
import pencil from '../../Assets/icons/Pencil.png'
import {Todo, TodoReducerAction} from "../reducer/todosReducer";
import { IconButton } from 'koi-pool';


type TodoItemProps = Todo & {
  id: string,
  todosDispatch: Dispatch<TodoReducerAction>,
  bgColor: string
}
const TodoItem = ({id, checked, goal, isEditing, bgColor, todosDispatch}: TodoItemProps) => {

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
    <div className={'todolist-item ' + bgColor}>
      <input type='checkbox' onChange={handleChecked}
             checked={checked}/>{
      isEditing
        ? <input className={'todolist-item-edit'} value={goal}
                 onChange={handleEdit}
                 onKeyPress={handleKeyPress}/>
        : <p onDoubleClick={toggleEdit}>{goal}</p>
    }
      <IconButton onClick={toggleEdit} alt={'Edit'}  src={
        isEditing
          ? '+'
          : pencil
      }/>
      <IconButton alt={'X'} src={''} onClick={deleteGoal}>x</IconButton>
    </div>
  );
};


export default TodoItem;

