import {createId} from "@paralleldrive/cuid2";
export type Todo = {
  goal: string,
  checked: boolean,
  isEditing: boolean
}
export type Todos = Record<string, Todo>;
export type TodoReducerState = { todos: Record<string, Todo>, totalChecked: number }
export type TodoReducerAction =
  { id: string, type: 'toggleGoalCheck' | 'deleteTodo' | 'toggleEdit' }
  | { type: "addTodo", goal: string }
  | { type: "editTodo", goal: string, id: string }
const todosReducer = (state: TodoReducerState, action: TodoReducerAction) => {
  const countChecked = (currentTodos: Todos) => {
    const todoIds = Object.keys(currentTodos);
    return todoIds.reduce((prevValue, currentId) => prevValue + (currentTodos[currentId].checked ? 1 : 0), 0)
  };
  switch (action.type) {
    case "toggleGoalCheck": {
      const currentTodo = state.todos[action.id];
      const newTodos = {...state.todos, [action.id]: {...currentTodo, checked: !currentTodo.checked}};

      return {todos: newTodos, totalChecked: countChecked(newTodos)}
    }
    case "toggleEdit": {
      const currentTodo = state.todos[action.id];
      const newTodos = {...state.todos, [action.id]: {...currentTodo, isEditing: !currentTodo.isEditing}};

      return {...state, todos: newTodos}
    }
    case "editTodo": {
      const currentTodo = state.todos[action.id];
      const newTodos = {...state.todos, [action.id]: {...currentTodo, goal: action.goal}};

      return {...state, todos: newTodos}
    }
    case "addTodo": {
      return {...state, todos: {...state.todos, [createId()]: {goal: action.goal, checked: false, isEditing: false}}}
    }
    case "deleteTodo": {
      const currentTodos = state.todos;
      delete currentTodos[action.id];
      return {todos: currentTodos, totalChecked: countChecked(currentTodos)};
    }
  }
};
export default todosReducer;