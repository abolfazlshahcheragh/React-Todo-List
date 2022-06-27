import { useContext, useRef } from "react";
import TodoApp from "../context/TodoApp";


function TodoMaker() {
    const context = useContext(TodoApp);
    const inputTxtRef = useRef();
    const checkBoxRef = useRef();


    return (
        <section id="todo-maker" className={context.theme}>
            <label className={context.theme}>
                <input type="checkbox" ref={checkBoxRef} />
                <div className="checkBox"></div>
            </label>
            <input ref={inputTxtRef} onKeyDown={addTodo} type="text" placeholder="Create a new todo..." />
        </section>
    );

    function addTodo(e) {
        if (e.key === "enter" || e.keyCode === 13) {
            const name = inputTxtRef.current.value;
            if (name !== "") {
                context.addNewTodo(name, checkBoxRef.current.checked);
                // clear todo maker
                inputTxtRef.current.value = "";
                checkBoxRef.current.checked = false;
            }
        }
    }


}

export default TodoMaker;