import { useContext, useState, useRef } from "react";
import TodoApp from "../context/TodoApp";


function TodoMaker() {
    const context = useContext(TodoApp);
    const [active, setActive] = useState(false)
    const inputRef = useRef();

    return (
        <section id="todo-maker">
            {/* <div className="check-container">
                <button className={`check-box ${todoState[1]}`} onClick={changeTodoState}>
                    <img src={todoState[0]} alt="" />
                </button>
            </div> */}
            <div className="check-container">
                <button className={`check-box ${active ? "checked" : "not-checked"}`} onClick={changeTodoState}>
                    <img src={active ? context.images.iconCheck : null} alt="" />
                </button>
            </div>
            <input ref={inputRef} className="todo" onKeyDown={addTodo} type="text" placeholder="Create a new todo..." />
        </section>
    );

    function changeTodoState() {
        if (active) {
            setActive(false)
        } else {
            setActive(true)
        }
    }

    function addTodo(e) {
        if (e.key === "enter" || e.keyCode === 13) {
            const name = inputRef.current.value;
            if (name !== "") {
                context.addNewTodo(name, active);
            }
            inputRef.current.value = "";
            setActive(false);
        }
    }

}

export default TodoMaker;