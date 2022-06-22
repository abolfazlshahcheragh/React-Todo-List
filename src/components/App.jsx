import React, { Component, createContext, createRef } from 'react';
import TodoApp from "../context/TodoApp";
import "../styles/App.css"
import IMAGES from "../assets/Images";
import TodoMaker from './TodoMaker';
import TodoList from './TodoList';


class App extends Component {
    static contextType = createContext(TodoApp);

    constructor(props) {
        super(props);
        this.state = {
            device: "mobile",
            dimensions: [window.innerWidth, window.innerHeight],
            theme: {
                backgroundImage: IMAGES.bgMobileLight,
            },
            todos: [
                { id: 1, name: "item-1", isActive: true, isDone: false },
                { id: 2, name: "item-2", isActive: false, isDone: false },
                { id: 3, name: "item-3", isActive: false, isDone: true },
            ],
            todoList: []
        }

        this.filterAllRef = createRef();
        this.filterActiveRef = createRef();
        this.filterCompletedRef = createRef();
    }

    render() {
        return (
            <>
                <img src={IMAGES.bgMobileLight} id="bgImage" alt="" />
                <section id='app'>
                    <section id='header'>
                        <h3>todo</h3>
                        <button id='toggle-theme'>
                            <img src={IMAGES.iconMoon} alt="" />
                        </button>
                    </section>
                    <TodoApp.Provider
                        value={{
                            images: IMAGES,
                            todos: this.state.todoList,
                            addNewTodo: this.addNewTodo,
                            toggleActiveState: this.toggleActiveState,
                            toggleCompleteState: this.toggleCompleteState,
                            deleteTodo: this.deleteTodo,
                        }}
                    >
                        <TodoMaker />
                        <section id='todo-container'>
                            <TodoList />
                            <div id="todo-state">
                                <div id='items-count'>{this.state.todos.filter(todo => todo.isDone === false).length} items left</div>
                                <div className='filter'>
                                    <button onClick={this.filterAllHandler} ref={this.filterAllRef}
                                        className='btn' id='filter-all'>all</button>
                                    <button onClick={this.filterActiveHandler} ref={this.filterActiveRef}
                                        className='btn' id='filter-active'>active</button>
                                    <button onClick={this.filterCompletedHandler} ref={this.filterCompletedRef}
                                        className='btn' id='filter-completed'>completed</button>
                                </div>
                                <button className='btn' id='clear-completed'>clear completed</button>
                            </div>
                        </section>

                    </TodoApp.Provider>
                    <section className='filter'></section>
                    <section className='filter'></section>
                    <section id="todo-guide">drag and drop for order todos</section>
                </section>
            </>
        );
    }

    // ========================= todo filter ============================= // 

    filterTodos = (key) => {
        switch (key) {
            case "all":
                this.setState({ todoList: [...this.state.todos] });
                break;
            case "active":
                this.setState({
                    todoList: this.state.todos.filter(todo => todo.isActive === true)
                })
                break;
            case "completed":
                this.setState({
                    todoList: this.state.todos.filter(todo => todo.isDone === true)
                })
                break;
            default:
                return
        }
    }


    filterAllHandler = (e) => {
        this.filterAllRef.current.style.color = 'var(--link-active)'
        this.filterActiveRef.current.style.color = 'var(--dt-txt-default)'
        this.filterCompletedRef.current.style.color = 'var(--dt-txt-default)'
        this.filterTodos("all");
    }

    filterActiveHandler = (e) => {
        this.filterAllRef.current.style.color = 'var(--dt-txt-default)'
        this.filterActiveRef.current.style.color = 'var(--link-active)'
        this.filterCompletedRef.current.style.color = 'var(--dt-txt-default)'
        this.filterTodos("active");
    }

    filterCompletedHandler = (e) => {
        this.filterAllRef.current.style.color = 'var(--dt-txt-default)'
        this.filterActiveRef.current.style.color = 'var(--dt-txt-default)'
        this.filterCompletedRef.current.style.color = 'var(--link-active)'
        this.filterTodos("completed");
    }

    // ========================= todo controller ============================= //
    addNewTodo = (name, active) => {
        const { todos } = this.state;
        const id = Date.now();
        todos.push({ id: id, name: name, isActive: active, isDone: false })
        this.setState({ todos: todos })
    }

    toggleActiveState = (id) => {
        // this function for change active state any todo
        let { todos: newTodos } = this.state
        const index = newTodos.findIndex(todo => todo.id === id);
        newTodos[index].isActive = (newTodos[index].isActive) ? false : true;
        this.setState({ todos: newTodos });
    }

    toggleCompleteState = (id) => {
        let { todos: newTodos } = this.state
        const index = newTodos.findIndex(todo => todo.id === id);
        newTodos[index].isDone = (newTodos[index].isDone) ? false : true;
        this.setState({ todos: newTodos });
    }

    deleteTodo = (id) => {
        let { todos } = this.state
        const newTodos = todos.filter(todo => todo.id !== id);
        this.setState({ todos: newTodos });
    }

    componentDidMount(){
        this.filterTodos("all");
    }

}

export default App;