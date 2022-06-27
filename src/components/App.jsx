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
            // theme: (typeof localStorage.getItem('todoApp') === "string") ? JSON.parse(localStorage.getItem("todoApp")).theme : {},
            theme: {
                type: (typeof localStorage.getItem('todoApp') === "string") ? JSON.parse(localStorage.getItem("todoApp")).theme.type : "light",
                backgroundImage: [IMAGES.bgMobileLight, IMAGES.bgMobileDark],
            },
            // main list
            mainList: (typeof localStorage.getItem('todoApp') === "string") ? JSON.parse(localStorage.getItem("todoApp")).todos : [],
            // filter list
            todoList: [],
            filterType: "all",
            draggable: true,
        }
        this.filterRef = createRef();
        this.filterAllRef = createRef();
        this.filterActiveRef = createRef();
        this.filterCompletedRef = createRef();
    }

    render() {
        const { theme } = this.state;
        const backgroundImage = (theme.type === "light") ? theme.backgroundImage[0] : theme.backgroundImage[1];

        return (
            <section id='wrapper' className={theme.type}>
                <img src={backgroundImage} id="bgImage" alt="" />
                <section id='app'>
                    <section id='header'>
                        <h3>todo</h3>
                        <button onClick={this.toggleTheme}>
                            <img src={theme.type === "light" ? IMAGES.iconMoon : IMAGES.iconSun} alt="" />
                        </button>
                    </section>
                    <TodoApp.Provider
                        value={{
                            images: IMAGES,
                            theme: theme.type,
                            todos: this.state.todoList,
                            addNewTodo: this.addNewTodo,
                            toggleActiveState: this.toggleActiveState,
                            toggleCompleteState: this.toggleCompleteState,
                            deleteTodo: this.deleteTodo,
                            draggable: this.state.draggable,
                            onDragStartHandler: this.onDragStartHandler,
                            onDragOverHandler: this.onDragOverHandler,
                            onDragEndHandler: this.onDragEndHandler,
                            onDragDropHandler: this.onDragDropHandler,
                        }}
                    >
                        <TodoMaker />
                        <section id='todo-container'>
                            <TodoList />
                        </section>
                        <div id='count-items-left' className={theme.type}>
                            {this.state.mainList.filter(todo => todo.isDone === false).length} items left
                        </div>
                        <div id='filter' ref={this.filter1Ref} className={theme.type}>
                            <button
                                onClick={this.filterAllHandler} ref={this.filterAllRef}
                                className={theme.type} id='filter-all'>all</button>
                            <button
                                onClick={this.filterActiveHandler} ref={this.filterActiveRef}
                                className={theme.type} id='filter-active'>active</button>
                            <button
                                onClick={this.filterCompletedHandler} ref={this.filterCompletedRef}
                                className={theme.type} id='filter-completed'>completed</button>
                        </div>
                        <button
                            onClick={this.clearCompleted}
                            className={theme.type}
                            id='cc-btn'
                        > clear completed
                        </button>
                    </TodoApp.Provider>
                    <section id="todo-guide">drag and drop to reorder list</section>
                </section>
            </section>
        );
    }


    // ========================= toggle theme ============================= // 
    toggleTheme = () => {
        const newTheme = this.state.theme.type === "light" ? "dark" : "light";;
        this.updateData(
            this.state.mainList,
            {
                type: newTheme,
                backgroundImage: [IMAGES.bgMobileLight, IMAGES.bgMobileDark],
            }
        );
    }

    // ========================= update Todos ============================= // 
    updateData = (newTodos = [], newTheme = {}) => {
        // update todo state and localStorage
        this.setState({ mainList: newTodos, theme: newTheme });
        localStorage.setItem("todoApp", JSON.stringify({
            theme: newTheme,
            todos: newTodos,
        }));
        // update filter list
        this.setState({ todoList: newTodos });
    }

    // ========================= todo filter ============================= // 

    filter = (type) => {
        switch (type) {
            case "all":
                this.filterAllHandler();
                break;
            case "active":
                this.filterActiveHandler();
                break;
            case "completed":
                this.filterCompletedHandler();
                break;
            default:
                return 0;
        }
    }

    filterAllHandler = (e) => {
        this.filterAllRef.current.className = 'active';
        this.filterActiveRef.current.className = '';
        this.filterCompletedRef.current.className = '';
        this.setState({ todoList: [...this.state.mainList] });
        this.setState({ draggable: true, filterType: "all" });
    }

    filterActiveHandler = (e) => {
        this.filterAllRef.current.className = '';
        this.filterActiveRef.current.className = 'active';
        this.filterCompletedRef.current.className = '';
        this.setState({ todoList: this.state.mainList.filter(todo => todo.isActive === true) })
        this.setState({ draggable: false, filterType: "active" });
    }

    filterCompletedHandler = (e) => {
        this.filterAllRef.current.className = '';
        this.filterActiveRef.current.className = '';
        this.filterCompletedRef.current.className = 'active';
        this.setState({ todoList: this.state.mainList.filter(todo => todo.isDone === true) })
        this.setState({ draggable: false, filterType: "completed" });
    }

    // ========================= todo controller ============================= //
    addNewTodo = (name, active) => {
        const { mainList: newTodos } = this.state;
        const id = Date.now();
        newTodos.push({ id: id, name: name, isActive: active, isDone: false })
        this.updateData(newTodos, this.state.theme);
        this.filter(this.state.filterType);
    }

    toggleActiveState = (id) => {
        // this function for change active state any todo 
        let { mainList: newTodos } = this.state
        const index = newTodos.findIndex(todo => todo.id === id);
        newTodos[index].isActive = (newTodos[index].isActive) ? false : true;
        this.updateData(newTodos, this.state.theme);
        this.filter(this.state.filterType);
    }

    toggleCompleteState = (id) => {
        let { mainList: newTodos } = this.state
        const index = newTodos.findIndex(todo => todo.id === id);
        newTodos[index].isDone = (newTodos[index].isDone) ? false : true;
        this.updateData(newTodos, this.state.theme);
        this.filter(this.state.filterType);
    }

    deleteTodo = (id) => {
        const newTodos = this.state.mainList.filter(todo => todo.id !== id);
        this.updateData(newTodos, this.state.theme);
    }

    clearCompleted = () => {
        const newTodos = this.state.mainList.filter(todo => todo.isDone === false);
        this.updateData(newTodos, this.state.theme);
    }

    // ========================= life cycle method's ============================= //
    componentDidMount() {
        if (typeof localStorage.getItem('todoApp') !== "string") {
            // create a template for save data (todos&theme)
            localStorage.setItem("todoApp", JSON.stringify({}));
        }
        // initialize todoList state for display todos
        if (this.state.mainList !== []) {
            this.filter(this.state.filterType);
        }

        // window resize event
        window.addEventListener('resize', () => {
            this.setState({ dimensions: [window.innerWidth, window.innerHeight] })
            if (window.innerWidth < 550) {
                // mobile
                this.setState({
                    theme: {
                        type: this.state.theme.type,
                        backgroundImage: [IMAGES.bgMobileLight, IMAGES.bgMobileDark]
                    }
                });
                // change filter container

            } else {
                // desktop
                this.setState({
                    theme: {
                        type: this.state.theme.type,
                        backgroundImage: [IMAGES.bgDesktopLight, IMAGES.bgDesktopDark]
                    }
                });
                // change filter container

            }
        });
    }

    // ========================= drag and drop method's ============================= //

    // Get index of todo which that Element is dragged
    dragged = null;

    onDragStartHandler = (ref, home) => {
        ref.current.style.opacity = '0.2';
        this.dragged = home;
    }


    onDragEndHandler = (ref, home) => {
        ref.current.style.opacity = '1';
    }

    onDragDropHandler = (ref, home) => {

        let draggedpos = this.dragged;
        let droppedpos = home;

        const { todoList } = this.state;
        let todoDragged = todoList[draggedpos];
        // get new list from todos and removed todo is dragging
        let newTodos = todoList.filter(todo => todo !== todoDragged);
        // change position todo from list
        newTodos.splice(droppedpos, 0, todoDragged);
        // update list
        this.setState({ mainList: newTodos });
        this.setState({ todoList: newTodos });

        localStorage.setItem("todoApp", JSON.stringify({
            theme: this.state.theme,
            todos: newTodos,
        }));
    }



}



export default App;