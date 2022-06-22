import { useContext } from "react";
import TodoApp from "../context/TodoApp";
import Todo from "./Todo";

const TodoList = () => {
    const context = useContext(TodoApp);

    return (
        <ul className="todo-list">
            {
                context.todos.map((todo, index) =>
                    <Todo
                        id={todo.id}
                        isActive={todo.isActive}
                        isDone={todo.isDone}
                        todoName={todo.name}
                        toggleActiveState={context.toggleActiveState}
                        toggleCompleteState={context.toggleCompleteState}
                        deleteTodo={context.deleteTodo}
                        key={index}
                    />)
            }
        </ul>
    );
}

export default TodoList;