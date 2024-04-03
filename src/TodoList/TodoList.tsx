
import React from 'react';
import {getStorage, setStorage} from "../Utlis/localStorage";
import TrackVisibility from "../Utlis/TrackVisibility";
import './TodoList.css'

const TodoList = () => {


    constructor(props) {
        super(props);
        this.state = {
            value: '',
            goals: [],
            checkedAmt: 0,
            runAnimation: false
        };
        this.handleChecked = this.handleChecked.bind(this);
        this.handleGoal = this.handleGoal.bind(this);
        this.deleteGoal = this.deleteGoal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
    }

    componentDidMount() {
        this.setState({goals: getStorage('goals', this.state.goals)})
    }

    handleChecked(ID) {
        let {goal, checked, id, isEditing} = this.state.goals.find(g => g.id === ID);
        let index = this.state.goals.findIndex((g) => g.id === id);
        let newGoals = this.state.goals.filter(g => g.id !== id);
        newGoals.splice(index, 0, {goal: goal, checked: !checked, id: id, isEditing});
        if (checked) {
            this.setState({goals: newGoals, checkedAmt: this.state.checkedAmt - 1})
        } else {
            this.setState({goals: newGoals, checkedAmt: this.state.checkedAmt + 1})
        }
    }

    handleGoal(e) {
        this.setState({value: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.value.trim().length !== 0) {
            this.setState({
                value: '',
                goals: [...this.state.goals, {
                    goal: this.state.value.trim(),
                    checked: false,
                    isEditing: false,
                    id: cuid()
                }]
            }, () => setStorage(this.state.goals, 'goals'));
        }
    }

    deleteGoal(ID) {
        let {checked, id} = this.state.goals.find(g => g.id === ID);
        if (checked) {
            this.setState({
                goals: this.state.goals.filter(g => g.id !== id),
                checkedAmt: this.state.checkedAmt - 1
            }, () => setStorage(this.state.goals, 'goals'))
        } else {
            this.setState({
                goals: this.state.goals.filter(g => g.id !== id),
                checkedAmt: this.state.checkedAmt
            }, () => setStorage(this.state.goals, 'goals'))
        }
        setStorage(this.state.goals, 'goals')
    }

    toggleEdit(ID) {
        let goals = this.state.goals;
        const {goal, checked, id, isEditing} = goals.find((GOAL) => GOAL.id === ID);
        goals.splice(goals.findIndex((GOAL) => GOAL.id === ID), 1, {goal, checked, id, isEditing: !isEditing});
        this.setState({goals});
    }

    handleEdit(event, ID) {
        let goals = this.state.goals;
        const {checked, id, isEditing} = goals.find((GOAL) => GOAL.id === ID);
        goals.splice(goals.findIndex((GOAL) => GOAL.id === ID), 1, {goal: event.target.value, checked, id, isEditing});
        this.setState({goals});
    }

    submitEdit(ID) {
        let goals = this.state.goals;
        const {goal, checked, id} = goals.find((GOAL) => GOAL.id === ID);
        goals.splice(goals.findIndex((GOAL) => GOAL.id === ID), 1, {goal, checked, id, isEditing: false});
        this.setState({goals});
        setStorage(goals, 'goals');
    }

    render() {
        return (
            <TrackVisibility onVisible={() => this.setState({runAnimation: true})}>
                <div className="todolist">
                    <p style={{animation: (this.state.runAnimation) ? '1s 1s slide-in-right forwards' : ''}}>Completed: {this.state.checkedAmt}</p>
                    <h1 style={{animation: (this.state.runAnimation) ? '1s slide-in-up forwards' : ''}}>TodoList</h1>
                    <form style={{animation: (this.state.runAnimation) ? '1s 1s slide-in-up forwards' : ''}} onSubmit={this.handleSubmit}>
                        <label>
                            Goal:
                            <input type="text" value={this.state.value} onChange={this.handleGoal}/>
                        </label>
                        <button onClick={this.handleSubmit}>+</button>
                    </form>
                    <div style={{animation: (this.state.runAnimation) ? '1s 2s fade-in forwards' : ''}}>
                        {this.state.goals.map((goal, i) =>
                            <TodoItem key={i} goal={goal.goal} checked={goal.checked} handleChecked={this.handleChecked}
                                      toggleEdit={this.toggleEdit} handleEdit={this.handleEdit}
                                      submitEdit={this.submitEdit} isEditing={goal.isEditing}
                                      id={goal.id} bgColor={(i % 2) ? 'tinted' : ''} deleteGoal={this.deleteGoal}/>)}
                    </div>
                </div>
            </TrackVisibility>
        );
    }

}


export default TodoList;

