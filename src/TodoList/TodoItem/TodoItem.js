import React from 'react';

class TodoItem extends React.Component {
    render() {
        return (
            <div className={'todolist-item '+this.props.bgColor}>
                <input type='checkbox'/>
                <p>{this.props.goal}</p>
                <button onClick={()=> this.props.deleteGoal(this.props.index)}>X</button>
            </div>
        );
    }

}


export default TodoItem;

