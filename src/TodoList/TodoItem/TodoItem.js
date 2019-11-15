import React from 'react';

class TodoItem extends React.Component {
    render() {
        return (
            <div className={'todolist-item '+this.props.bgColor}>
                <input type='checkbox' onChange={()=> this.props.handleChecked(this.props.id)} checked={this.props.checked}/>
                <p>{this.props.goal}</p>
                <button onClick={()=> this.props.deleteGoal(this.props.id)}>X</button>
            </div>
        );
    }

}


export default TodoItem;

