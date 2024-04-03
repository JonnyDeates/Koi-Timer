import React from 'react';
import pencil from '../../Assets/icons/Pencil.png'
class TodoItem extends React.Component {
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.props.submitEdit(this.props.id)
        }
    }
    render() {
        return (
            <div className={'todolist-item ' + this.props.bgColor}>
                <input type='checkbox' onChange={() => this.props.handleChecked(this.props.id)}
                       checked={this.props.checked}/>
                {(this.props.isEditing) ?
                    <input className={'todolist-item-edit'} value={this.props.goal} onChange={(e) => this.props.handleEdit(e, this.props.id)}
                           onKeyPress={this.handleKeyPress}
                    /> :
                    <p onDoubleClick={() => this.props.toggleEdit(this.props.id)}>{this.props.goal}</p>}
                <button onClick={() => this.props.toggleEdit(this.props.id)}>{(this.props.isEditing) ? '+' : <img src={pencil} alt={'Edit'}/>}</button>
                <button onClick={() => this.props.deleteGoal(this.props.id)}>X</button>
            </div>
        );
    }

}


export default TodoItem;

