import React from 'react';
import './TodoList.css'
import TodoItem from "./TodoItem/TodoItem";

class TodoList extends React.Component {
    state = {
        value: '',
        goals: []
    };
    constructor(props) {
        super(props);
        this.handleGoal = this.handleGoal.bind(this);
        this.deleteGoal = this.deleteGoal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleGoal(e){
        this.setState({value: e.target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({value: '', goals: [this.state.value, ...this.state.goals]});
    }
    deleteGoal(i) {
        this.setState({goals: this.state.goals.filter((g,index)=> index !== i)})
    }
    render() {
        return (
            <div className="todolist">
                <h1>TodoList</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Goal:
                        <input type="text" value={this.state.value} onChange={this.handleGoal}/>
                    </label>
                    <button onClick={this.handleSubmit}>+</button>
                </form>
            <div >
                {this.state.goals.map((goal,i) => <TodoItem key={i} goal={goal} index={i} bgColor={(i%2) ? 'tinted' : ''} deleteGoal={this.deleteGoal}/>)}
            </div>
            </div>
        );
    }

}


export default TodoList;

