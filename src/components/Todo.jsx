import { Component, createRef } from 'react';
import TodoApp from '../context/TodoApp';


class Todo extends Component {
    static contextType = TodoApp;
    elementRef = createRef();
    checkBoxRef = createRef();

    render() {
        const { id, todoName, isDone, index, theme } = this.props

        return (
            <li
                ref={this.elementRef}
                className="todo"
                draggable={this.context.draggable}
                onDragStart={(e) => { this.context.onDragStartHandler(this.elementRef, index) }}
                onDragOver={(e) => {
                    // stop default action 
                    e.preventDefault();
                }}
                onDragEnd={(e) => { this.context.onDragEndHandler(this.elementRef, index) }}
                onDrop={(e) => {
                    // stop default action 
                    e.preventDefault();
                    this.context.onDragDropHandler(this.elementRef, index)
                }}
            >
                <label className={theme} >
                    <input type="checkbox" ref={this.checkBoxRef}
                        onChange={() => { this.context.toggleActiveState(id) }} />
                    <div className="checkBox"></div>
                </label>
                <p
                    className={isDone ? `${theme} completed` : theme}
                    onClick={() => { this.context.toggleCompleteState(id) }}
                >
                    {todoName}
                </p>
                <div>
                    <button
                        className="delete-box"
                        onClick={() => { this.context.deleteTodo(id) }}>
                        <img src={this.context.images.iconCross} alt="" />
                    </button>
                </div>
            </li>
        );

    }

    componentDidMount() {
        this.checkBoxRef.current.checked = this.props.isActive;
    }
    componentDidUpdate() {
        this.checkBoxRef.current.checked = this.props.isActive;

    }
}

export default Todo;


