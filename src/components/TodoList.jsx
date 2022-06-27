import { useContext } from "react";
import TodoApp from "../context/TodoApp";
import Todo from "./Todo";

const TodoList = () => {
    const context = useContext(TodoApp);

    return (
        <ul className={`todo-list ${context.theme}`}>
            {
                context.todos.map((todo, index) =>
                    <Todo 
                        key={index}
                        id={todo.id}
                        isActive={todo.isActive}
                        isDone={todo.isDone}
                        todoName={todo.name}
                        index={index}
                        toggleActiveState={context.toggleActiveState}
                        toggleCompleteState={context.toggleCompleteState}
                        deleteTodo={context.deleteTodo}
                        theme={context.theme}
                    />)
            }
        </ul>
    );
}

export default TodoList;