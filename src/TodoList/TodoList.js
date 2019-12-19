import React from 'react';
import './TodoList.css'
import TodoItem from "./TodoItem/TodoItem";
import cuid from 'cuid'
class TodoList extends React.Component {
    state = {
        value: '',
        goals: [],
        checkedAmt: 0
    }; // Data
    constructor(props) {
        super(props);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleGoal = this.handleGoal.bind(this);
        this.deleteGoal = this.deleteGoal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChecked(ID){
        let {goal, checked, id} = this.state.goals.find(g=> g.id === ID);
        let index = this.state.goals.findIndex((g)=> g.id === id);
        let newGoals = this.state.goals.filter(g=> g.id !== id);
        newGoals.splice(index, 0 ,{goal: goal, checked: !checked, id: id});
        if(checked) {
            this.setState({goals: newGoals, checkedAmt: this.state.checkedAmt-1})
        } else {
            this.setState({goals: newGoals,checkedAmt: this.state.checkedAmt+1})
        }
    }
    handleGoal(e){
        this.setState({value: e.target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({value: '', goals: [...this.state.goals, {goal: this.state.value, checked: false, id: cuid()} ]});
    }
    deleteGoal(ID) {
        let {goal, checked, id} = this.state.goals.find(g=> g.id === ID);
        if(checked) {
            this.setState({goals: this.state.goals.filter(g=> g.id !== id), checkedAmt: this.state.checkedAmt-1})
        } else {
            this.setState({goals: this.state.goals.filter(g=> g.id !== id), checkedAmt: this.state.checkedAmt})
        }

    }
    render() {
        return (
            <div className="todolist">

                <p>Completed: {this.state.checkedAmt}</p>
                <h1>TodoList</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Goal:
                        <input type="text" value={this.state.value} onChange={this.handleGoal}/>
                    </label>
                    <button onClick={this.handleSubmit}>+</button>
                </form>
            <div >
                {this.state.goals.map((goal,i) => <TodoItem key={i} goal={goal.goal} checked={goal.checked} handleChecked={this.handleChecked} id={goal.id} bgColor={(i%2) ? 'tinted' : ''} deleteGoal={this.deleteGoal}/>)}
            </div>
            </div>
        );
    }

}


export default TodoList;

