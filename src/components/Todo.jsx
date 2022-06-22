import { Component } from 'react';
import TodoApp from '../context/TodoApp';


class Todo extends Component {
    static contextType = TodoApp;

    render() {
        const { id, todoName, isActive, isDone, deleteTodo, toggleActiveState, toggleCompleteState } = this.props
        return (
            <li className="todo">
                <div className="check-container">
                    <button className={`check-box ${isActive ? "checked" : "not-checked"}`} onClick={() => { toggleActiveState(id) }}>
                        <img src={this.context.images.iconCheck} alt="" />
                    </button>
                </div>
                <p className={isDone ? "completed" : "not-completed"} onClick={() => { toggleCompleteState(id) }}>{todoName}</p>
                <div className="check-container">
                    <button className="delete-box" onClick={() => { deleteTodo(id)}}>
                        <img src={this.context.images.iconCross} alt="" />
                    </button>
                </div>
            </li>
        );
    }
}

export default Todo;